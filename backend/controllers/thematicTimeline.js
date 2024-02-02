const ThematicTimeline = require('../models/ThematicTimeline');

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