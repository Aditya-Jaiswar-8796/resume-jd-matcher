import Jdform from "./components/Jdform";
import ResumeUpload from "./components/ResumeUpload";


export default function Home() {
  return (
    <>
    <div className="w-full flex p-5 gap-5 ">
      <Jdform className="w-[60%]"/>
      <ResumeUpload className="w-[40%]"/>
    </div>
    </>
  );
}
