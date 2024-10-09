import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="text-center font-bold text-red-700 text-[25px] underline">
        About Website
      </h1>
      <div className="w-[90%] md:w-[60%] max-w-[400px] mx-auto mt-3">
        <p className="font-serif">
          This website is a fiction. No Real Jobs or people. Images are
          generated with the help of META AI
        </p>
        <p className="font-semibold">
          This website is created by{" "}
          <span
            className="hover:text-[blue] cursor-pointer underline"
            onClick={() => window.open("https://linkedin.com/in/devofficial")}
          >
            Devansh Raghuwanshi
          </span>{" "}
          (A77) who was an intern in CodSoft during 20 Sept 2024 to 20 Oct 2024.
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
        <h1 className="font-bold text-[25px]">FAQs</h1>
        <p id="q1" className="font-bold">
          {" "}
          Q1. Why we ask about Gender?
        </p>
        <p id="q2" className="font-bold">
          {" "}
          Q2. Why we ask for uploading Profile Picture ?
        </p>
      </div>
    </div>
  );
}
