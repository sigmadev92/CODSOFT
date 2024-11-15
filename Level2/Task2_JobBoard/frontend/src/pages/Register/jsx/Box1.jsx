import { Link } from "react-router-dom";

export default function Box1(props) {
  function handleChange(e) {
    props.setType(e.target.value);
    props.setHidden(true);
  }
  return (
    <>
      <h1 className="font-serif text-center bg-black text-[aqua] rounded-t-md">
        You want to get Registered as
      </h1>
      <form className=" p-3">
        <label>
          {" "}
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"seeker"}
            onChange={handleChange}
            checked={props.UserType === "seeker"}
          />
          Job Seeker
        </label>

        <label>
          {" "}
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"org"}
            onChange={handleChange}
          />
          Organisation
        </label>

        <label>
          <input
            type="radio"
            name="Type"
            id="Type"
            value={"recruiter"}
            onChange={handleChange}
          />
          Recruiter
        </label>
      </form>
      <div className="flex justify-around text-[12px] my-2">
        <Link to="/login" className="hover:text-[blue]">
          Already have an account ? Login
        </Link>
        <Link to="/forgot-password" className="hover:text-[red]">
          Forgot Password
        </Link>
      </div>
      <button
        type="button"
        className="text-gray-900 bg-green-600 px-2 ml-3 my-1 rounded-md hover:bg-green-500 "
        onClick={() => {
          props.setHidden(false);
        }}
      >
        {" "}
        Proceed
      </button>
    </>
  );
}
