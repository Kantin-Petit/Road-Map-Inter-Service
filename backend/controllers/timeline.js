const Timeline = require('../models/Timeline');
const Service = require('../models/Service');
const Thematic = require('../models/Thematic');
const { Op } = require("sequelize");

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
        order: [['date_start', 'ASC']],
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

    const { title, image, text } = req.body;
    const timeline = new Timeline({ title, image, text })

    timeline.save()
        .then(() => res.status(201).json({ message: 'Timeline créé !' }))
        .catch(error => res.status(400).json({ error }));

}


exports.deleteTimeline = (req, res, next) => {

    const id = req.params.id;

    Timeline.findOne({ where: { id: id } })
        .then(timeline => {
            timeline.destroy()
                .then(() => res.status(201).json({ message: 'Timeline supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

}

exports.updateTimeline = (req, res, next) => {

    const { id, title, image, text } = req.body;

    Timeline.findOne({ where: { id: id } })
        .then(timeline => {
            timeline.update({ title, image, text })
                .then(() => res.status(201).json({ message: 'Timeline modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}