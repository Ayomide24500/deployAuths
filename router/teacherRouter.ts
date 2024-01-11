import { Router } from "express";
import {
  Signinteacher,
  VerifyTeacher,
  createAssistantTeacher,
  createHeadTeacher,
  createSubjectTeacher,
} from "../controller/teacherController";

const router: Router = Router();

router.route("/create-teacher").post(createHeadTeacher);
router.route("/create-subject-teacher").post(createSubjectTeacher);
router.route("/create-assistants-teacher").post(createAssistantTeacher);
router.route("/verify-teacher/:teacherID").patch(VerifyTeacher);
router.route("/signin-teacher").post(Signinteacher);

export default router;
