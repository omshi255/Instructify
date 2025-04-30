import { useParams } from "react-router-dom";
import ProgressBar from "../pages/LearningProgress.jsx"; // path accordingly
import '../components/Footer.css'
const CoursePage = () => {
  const { courseId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Details</h1>

      {/* Progress Bar */}
      <ProgressBar courseId={courseId} />

      {/* Baaki Course Content */}
    </div>
  );
};

export default CoursePage;
