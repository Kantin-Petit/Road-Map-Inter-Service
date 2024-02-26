const Timeline = require('../models/Timeline');
const Service = require('../models/Service');
const Thematic = require('../models/Thematic');
const { Op } = require("sequelize");
const fs = require('fs');

const getTimelines = async (req, res, next, servicesFilter, thematicFilter) => {
  try {
    const timelines = await Timeline.findAll({
      include: [
        {
          model: Service,
          where: servicesFilter,
        },
        {
          model: Thematic,
          attributes: ['name', 'id', 'color'],
          through: { attributes: [] },
          where: thematicFilter,
        }
      ],
      order: [['date_start', 'ASC']],
    });

    const result = timelines.reduce((acc, timeline) => {
      const service = timeline.Service;
      const { Service, Thematic, ...timelineData } = timeline.dataValues;
      const newSujet = { ...timelineData };

      const existingServiceIndex = acc.findIndex(item => item.id === service.id);

      if (existingServiceIndex !== -1) {
        acc[existingServiceIndex].sujets.push(newSujet);
      } else {
        const newEntry = { ...service.dataValues, sujets: [newSujet] };
        acc.push(newEntry);
      }

      return acc;
    }, []);

    res.send(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAllTimelines = async (req, res, next) => {
  await getTimelines(req, res, next, {}, {});
};

exports.getFilteredTimelines = async (req, res, next) => {

  const { services, thematic, hasThematic } = req.body;

  const servicesFilter = { id: { [Op.or]: services } };
  const thematicFilter = hasThematic ? { id: { [Op.or]: thematic } } : {};

  await getTimelines(req, res, next, servicesFilter, thematicFilter);
};

exports.getListTimelines = (req, res, next) => {

  const { serviceName } = req.body;

  Timeline.findAll({
    include: [
      {
        model: Service,
        where: serviceName,
        attributes: ['name'],
      },
      {
        model: Thematic,
        attributes: ['name', 'id'],
        through: { attributes: [] },
      }
    ],
    // order: [['date_start', 'ASC']],
  })
    .then(timelines => res.send(timelines))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneTimeline = (req, res, next) => {

  Timeline.findOne({ where: { id: req.params.id } })
    .then(service => res.send(service))
    .catch(error => res.status(500).json({ error }));

};



exports.createTimeline = (req, res, next) => {

  const { title, text, date_start, date_end, service_id } = req.body;
  const timeline = new Timeline({ title, text, date_start, date_end, service_id })

  timeline.save()
    .then((savedTimeline) => {
      Timeline.findOne({
        where: { id: savedTimeline.id },
        include: [
          {
            model: Service,
            attributes: ['name'],
          },
          {
            model: Thematic,
            attributes: ['name', 'id'],
            through: { attributes: [] },
          }
        ],
      })
        .then((timeline) => res.status(201).json({ message: 'Timeline créé !', timeline }))
        .catch(error => res.status(400).json({ message: 'cannot find Timeline', error }));
    })
    .catch(error => res.status(400).json({ error }));

}


exports.deleteTimeline = (req, res, next) => {

  const id = req.params.id;
  const service_id = req.params.service_id;

  Timeline.findOne({ where: { id: id } })
    .then(timeline => {
      timeline.destroy()
        .then(() => {

          const folderPath = `images/services/service${service_id}/timeline${id}`;
          if (fs.existsSync(folderPath)) fs.rmdirSync(folderPath, { recursive: true });
          res.status(201).json({ message: 'Timeline supprimé !' });
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}

exports.updateTimeline = (req, res, next) => {

  const id = req.params.id;
  const { title, text, date_start, date_end, service_id } = req.body;

  Timeline.findOne({ where: { id: id } })
    .then(timeline => {
      if (!timeline) {
        return res.status(404).json({ message: 'Timeline non trouvé' });
      }

      let oldImage = timeline.image;
      let oldServiceId = timeline.service_id;

      const oldFolderPath = `images/services/service${oldServiceId}/timeline${id}`;
      const newFolderPath = `images/services/service${service_id}/timeline${id}`;

      if (req.file) {
        const newImage = req.file.filename;
        timeline.image = newImage;

        if (oldServiceId != Number(service_id)) {
          if (fs.existsSync(oldFolderPath)) fs.rmdirSync(oldFolderPath, { recursive: true });
        } else {
          if (fs.existsSync(`${newFolderPath}/${oldImage}`) && oldImage != newImage) fs.unlink(`${newFolderPath}/${oldImage}`, (err) => { });
        }

      } else {
        if (oldServiceId !== service_id) {
          if (fs.existsSync(oldFolderPath)) fs.renameSync(oldFolderPath, newFolderPath);
        }
      }

      timeline.title = title;
      timeline.text = text;
      timeline.date_start = date_start;
      timeline.date_end = date_end;
      timeline.service_id = Number(service_id);

      return timeline.save();
    })
    .then(() => res.status(200).json({ message: 'Timeline modifié !', image: req.file ? req.file.filename : null }))
    .catch(error => res.status(500).json({ error }));
}