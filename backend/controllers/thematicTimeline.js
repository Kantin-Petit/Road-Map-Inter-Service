const ThematicTimeline = require('../models/ThematicTimeline');
const Timeline = require('../models/Timeline');

exports.getAssociation = (req, res, next) => {
    ThematicTimeline.findAll({
        where: { timeline_id: req.params.id }
    })
        .then(results => res.json(results))
        .catch(error => {
            console.error('Error fetching ThematicTimeline:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.createAssociation = (req, res, next) => {

    Timeline.findByPk(req.body.timeline_id)
        .then(timeline => {
            if (timeline) {
                const serviceIdOfTimeline = timeline.dataValues.service_id

                if (req.auth.userRole !== 'admin') {
                    if (req.auth.userServiceId != serviceIdOfTimeline) return res.status(403).json({ error: 'Forbidden' });
                }

                ThematicTimeline.create({
                    timeline_id: req.body.timeline_id,
                    thematic_id: req.body.thematic_id
                })
                    .then(result => res.json({ message: 'Association created successfully' }))
                    .catch(error => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });

            }
        })


};

exports.deleteAssociation = (req, res, next) => {

    Timeline.findByPk(req.body.timeline_id)
        .then(timeline => {
            if (timeline) {
                const serviceIdOfTimeline = timeline.dataValues.service_id

                if (req.auth.userRole !== 'admin') {
                    if (req.auth.userServiceId != serviceIdOfTimeline) return res.status(403).json({ error: 'Forbidden' });
                }

                ThematicTimeline.destroy({
                    where: {
                        timeline_id: req.params.timelineId,
                        thematic_id: req.params.thematicId
                    }
                })
                    .then(() => res.json({ message: 'Association deleted successfully' }))
                    .catch(error => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });

            }
        })

};