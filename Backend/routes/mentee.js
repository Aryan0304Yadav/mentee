const express = require('express');
const { attendance_fetch, dashboard_fetch, personal_details_fetch, personal_details_put, residential_details_fetch, residential_details_put, observations_fetch, pre_admission_academic_details_fetch, parent_details_fetch, parent_details_put, misc_details_fetch, misc_details_put, post_admission_academic_details_fetch, post_admission_academic_details_put, achievements_before_fetch, achievements_before_put, achievements_after_fetch, achievements_after_put, current_semester_fetch } = require('../controllers/mentee_controllers');

const menteeRouter = express.Router();

menteeRouter.get('/attendance-fetch/:id', attendance_fetch);

menteeRouter.get('/dashboard-fetch/:id', dashboard_fetch);

menteeRouter.get('/personal-details-fetch/:id', personal_details_fetch);

menteeRouter.put('/personal-details-put/:id', personal_details_put);

menteeRouter.get('/misc-details-fetch/:id', misc_details_fetch);

menteeRouter.put('/misc-details-put/:id', misc_details_put);

menteeRouter.get('/residential-details-fetch/:id', residential_details_fetch);

menteeRouter.put('/residential-details-put/:id', residential_details_put);

menteeRouter.get('/pre-admission-academic-details-fetch/:id', pre_admission_academic_details_fetch);

menteeRouter.get('/post-admission-academic-details-fetch/:id/:current_sem', post_admission_academic_details_fetch);

menteeRouter.put('/post-admission-academic-details-put/:id', post_admission_academic_details_put);

menteeRouter.get('/observations-fetch/:id', observations_fetch);

menteeRouter.get('/parent-details-fetch/:id', parent_details_fetch);

menteeRouter.put('/parent-details-put/:id', parent_details_put);

menteeRouter.get('/achievements-before-fetch/:id', achievements_before_fetch);

menteeRouter.put('/achievements-before-put/:id', achievements_before_put);

menteeRouter.get('/achievements-after-fetch/:id', achievements_after_fetch);

menteeRouter.put('/achievements-after-put/:id', achievements_after_put);

menteeRouter.get('/current-semester-fetch/:id', current_semester_fetch);

module.exports = menteeRouter;