import Image from "next/image";

const Card = ({ person, filter, skills = [] }) => {
  return (
    <div
      className={`flex flex-col h-[400px] w-80 p-4 mb-16 bg-white shadow-xl border-l-4  rounded-lg md:mb-4 md:h-40 md:justify-between md:items-center md:w-5/6  ${
        person.postedAt.split(" ")[0] === "1d" ? "border-cyan-700" : ""
      }`}
    >
      <div className="flex flex-col h-60  relative items-start md:w-full md:flex-row md:justify-between md:align-middle md:items-center md:h-28  ">
        <div className="flex flex-col absolute -top-14 md:static items-start md:align-middle md:items-center md:h-28 md:flex-row ">
          <div className="h-20 mb-3">
            <Image
              src={person.logo.substring(1)}
              width={90}
              height={10}
              alt="logo"
              className=" mr-5 md:ml-6 "
            />
          </div>
          {/* Texts Card */}
          <div className="flex flex-col w-64">
            <div className="flex align-middle items-center space-x-4 justify-start w-64">
              <p className="p-1 text-cyan-600 font-bold">{person.company}</p>

              {person.new && (
                <p className="pl-2 pt-1 pr-2 mr-2 bg-cyan-400 rounded-full text-white">
                  NEW!
                </p>
              )}

              {person.featured && (
                <p className="pl-2 pt-1 pr-2  bg-black rounded-full text-white">
                  FEATURED
                </p>
              )}
            </div>

            <h1 className="md:text-xl pt-3 font-bold">{person.position}</h1>

            <div className="flex align-middle items-center justify-between text-gray-400 font-bold w-full">
              <p className="pt-2 pb-1">{person.postedAt}</p>
              <p className="pt-2 text-2xl pb-1 -mt-2  ">.</p>
              <p className="pt-2 pb-1">{person.contract}</p>
              <p className="pt-2 text-2xl pb-1 -mt-2  ">.</p>
              <p className="pt-2 pb-1">{person.location}</p>
            </div>
          </div>
        </div>

        {/* Skils */}
        <div className="flex absolute top-36 md:static flex-wrap mt-2 w-ful">
          {/* horizontal spacing line */}
          <div className="border w-full md:hidden border-t-1 border-gray-300 mb-2"></div>

          {person.resume.map((elm, index) => (
            <p
              key={index}
              onClick={() => filter(person.resume, index)}
              className={`${
                skills.includes(elm)
                  ? "bg-cyan-700 text-white"
                  : "bg-cyan-100 text-cyan-700 "
              } text-xl font-bold hover:cursor-pointer mt-2 mb-3 mr-4 ml-3 p-1 rounded-md`}
            >
              {elm}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
