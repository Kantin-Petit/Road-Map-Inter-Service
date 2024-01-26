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
                    attributes: ['color', 'name', 'id'],
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