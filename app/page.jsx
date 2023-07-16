"use client";

import Card from "/components/Card.jsx";
import data from "./data.json";
import { useRef, useState } from "react";

//New key 'resume' consolidating all characteristics
const dataResume = data.map((elm) => ({
  ...elm,
  resume: [elm.role, elm.level, ...elm.languages, ...elm.tools],
}));

//--------------------------------
export default function Home() {
  const [filtering, setfiltering] = useState(false);
  const [dataState, setDataState] = useState(dataResume);
  const [dataStateFirstFilter, setdataStateFirstFilter] = useState([]);

  const skillsFilter = useRef(new Array());
  const secondaryFiltersUI = useRef(new Array());

  const [personResumeButFirst, setPersonResumeButFirst] = useState([]);

  // 'ind'--> index in the person.resume array
  function startFilter(choosedPersonSkills, ind) {
    if (filtering) clearFilter();
    setfiltering(true);

    // remove the start-filter skill from the person's resume
    // skillsButTheFirst is just for the UI
    const skillsButTheFirst = choosedPersonSkills.filter(
      (elm) => elm !== choosedPersonSkills[ind]
    );
    setPersonResumeButFirst(skillsButTheFirst);

    for (let i = 0; i < choosedPersonSkills.length - 1; i++) {
      if (i !== ind) secondaryFiltersUI.current.push(false);
    }
    // First filter skill.
    // The choosedPersonSkills is needed as is a choice comming from Card
    skillsFilter.current.push(choosedPersonSkills[ind]);

    const filteredData = dataState.filter((person) =>
      skillsFilter.current.every((skill) => person.resume.includes(skill))
    );

    setDataState(filteredData);
    // in case a first filter be cliked again
    setdataStateFirstFilter(filteredData);
  }

  // ind for the personResumeButFirst
  function moreFilters(ind) {
    const skillToAdd = personResumeButFirst[ind];
    let filteredData; // will recive the result of filtering data

    // if the secondary skill already is selected : removed it from the filter
    if (skillsFilter.current.includes(skillToAdd)) {
      const newSkillsArray = skillsFilter.current.filter(
        (skill) => skill !== skillToAdd
      );

      secondaryFiltersUI.current[ind] = false;

      skillsFilter.current = [...newSkillsArray];

      // recover the data from the primary filter
      filteredData = dataStateFirstFilter.filter((person) =>
        skillsFilter.current.every((skill) => person.resume.includes(skill))
      );
    } else {
      skillsFilter.current.push(personResumeButFirst[ind]);

      secondaryFiltersUI.current[ind] = true;

      // Intersection between arrays
      filteredData = dataState.filter((person) =>
        skillsFilter.current.every((skill) => person.resume.includes(skill))
      );
    }
    setDataState(filteredData);
  }

  function clearFilter() {
    setfiltering(false);
    skillsFilter.current = new Array();
    setPersonResumeButFirst([]);
    setDataState(dataResume);
    secondaryFiltersUI.current = [];
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center bg-light_bg">
      <header className="w-full h-32 mb-16">
        <div className="w-full h-32 bg-bg-mob md:bg-bg-dsk bg-no-repeat bg-cover bg-blend-multiply bg-primary"></div>
      </header>
      {/* Filter */}
      {filtering && (
        <div className="flex h-32 md:h-20 w-80 md:w-4/5 items-center justify-between bg-white absolute top-16 md:top-24 rounded-lg shadow-xl">
          <div className="flex flex-wrap md:h-6 ml-4">
            {personResumeButFirst.map((skill, index) => {
              return (
                <div className="flex" key={index}>
                  <p className="mb-4 pl-1 pr-1 bg-cyan-100 font-bold text-cyan-700 ">
                    {skill}
                  </p>
                  <div
                    onClick={() => moreFilters(index)}
                    className="mb-4 hover:cursor-pointer relative w-5 h-6 bg-primary mr-4"
                  >
                    {secondaryFiltersUI.current[index] && (
                      <span className="text-white absolute text-lg font-bold top-0 left-0 pl-1 pr-1 bg-vdark_cyan">
                        X
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <h1
            onClick={clearFilter}
            className=" bg-cyan-700 p-1 mr-6 hover:cursor-pointer rounded-md text-white"
          >
            Clear
          </h1>
        </div>
      )}
      {/* spacer for mobile */}
      <div className="md:hidden h-16 w-full"></div>
      {/* Card */}
      {dataState.map((elm, index) => (
        <Card
          key={index}
          person={elm}
          filter={startFilter}
          skills={skillsFilter.current}
        />
      ))}
    </main>
  );
}
