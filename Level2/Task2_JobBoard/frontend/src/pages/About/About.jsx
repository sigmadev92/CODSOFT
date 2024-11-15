import React from "react";

export default function About() {
  return (
    <div className="bg-yellow-100 h-[520px]">
      <h1 className="text-center font-bold text-red-700 text-[25px] underline">
        About Website
      </h1>
      <div className="w-[90%] md:w-[70%] mx-auto mt-3 bg-blue-200 p-2 shadow-xl shadow-blue-950 rounded-md h-[430px] overflow-y-scroll">
        <p className="font-serif">
          This website is a fiction. No Real Jobs or people. Images are
          generated with the help of META AI. You can register as any one but
          make sure you provide real email address (real phone number not
          required) to get notification.
        </p>
        <p className="font-semibold">
          This website is created by{" "}
          <span
            className="hover:text-[blue] cursor-pointer underline"
            onClick={() => window.open("https://linkedin.com/in/devofficial")}
          >
            Devansh Raghuwanshi
          </span>{" "}
          (A77) who was an intern in CodSoft during 20 Sept 2024 to 19 Oct 2024.
        </p>
        <p>
          About{" "}
          <button
            className="font-semibold text-[red] hover:text-[blue] pr-3"
            onClick={() => window.open("https://www.codsoft.in")}
          >
            CodSoft
          </button>
        </p>
        <p>
          Task 1 of the project :{" "}
          <button
            className="font-semibold text-[red] hover:text-[blue] pr-3"
            onClick={() =>
              window.open("https://tribute-acharya-prashant.netlify.app/")
            }
          >
            Tribute Page
          </button>
        </p>
        <h1 className="font-bold text-[25px]">FAQs</h1>
        <p id="q1" className="font-bold">
          {" "}
          Q1. Why do we ask about Gender?
        </p>
        <p>
          <span className="text-[blue] mr-3">Ans.</span>Only recruiter and job
          seekers are asked about the gender. We ask for gender as many
          recruiters and orgs provide gender specific jobs. If you are male and
          the job is for women candidates only then it will be shown on your
          feed too which you won't like. Also gender is a must data for
          recruiters and orgs. To get better acknowledgement, you must put your
          gender. There is no need to hide your gender. We are with you.
        </p>
        <p id="q2" className="font-bold">
          {" "}
          Q2. Why do we ask for uploading Profile Picture ?
        </p>
        <p className="mb-9">
          <span className="text-[blue]">Ans. </span>Profile picture increases
          authenticity and chances of being noticed by recruiters. Initially our
          website had no compulsary field for profile picture but we observed
          the lacking of trust between both the parties.
        </p>
        <p id="q3" className="font-bold">
          {" "}
          Q3. What are featured jobs?
        </p>
        <p className="mb-9">
          <span className="text-[blue]">Ans. </span>Featured Jobs are those jobs
          which are checked and fully verified by JobSoft Team on special
          request from the job provider. Featured jobs are in every field but a
          job seekers will see only those jobs which are related to their field
          and interests.
        </p>
        <h1 className="font-semibold">Criteria for featured jobs :</h1>
        <ol>
          <li>Proper description about job.</li>
          <li>More than 50 vacancies</li>
          <li>
            Posted by a FAANG like Organisation or a 10+ years experienced
            recruiter
          </li>
        </ol>
      </div>
    </div>
  );
}
