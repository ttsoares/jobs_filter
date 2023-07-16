"use client";

import Card from "/components/Card.jsx";
import data from "./data.json";
import { useRef, useState } from "react";
import { Chela_One, Fuggles } from "next/font/google";

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

  const [personResume, setPersonResume] = useState([]);
  const [startSkillIndex, setstartSkillIndex] = useState(null);

  // 'ind'--> index in the person.resume array
  function startFilter(choosedPersonSkills, ind) {
    if (filtering) clearFilter();
    setfiltering(true);

    setPersonResume(choosedPersonSkills);
    setstartSkillIndex(ind);

    skillsFilter.current.push(choosedPersonSkills[ind]);

    // Insersection between the array of skills selected
    // with the array of skills (resume key) of each person
    const filteredData = dataState.filter((person) =>
      skillsFilter.current.every((skill) => person.resume.includes(skill))
    );

    setDataState(filteredData);
    setdataStateFirstFilter(filteredData);
  }

  function moreFilters(ind) {
    // se o skill já existe --> remover
    const skillToAdd = personResume[ind];
    let filteredData;

    if (skillsFilter.current.includes(skillToAdd)) {
      // Remove the skill from the filter if clicked twice
      const newSkillsArray = skillsFilter.current.filter(
        (skill) => skill !== skillToAdd
      );
      skillsFilter.current = [...newSkillsArray];
      // Intersection between arrays
      filteredData = dataStateFirstFilter.filter((person) =>
        skillsFilter.current.every((skill) => person.resume.includes(skill))
      );
    } else {
      skillsFilter.current.push(personResume[ind]);
      // Intersection between arrays
      filteredData = dataState.filter((person) =>
        skillsFilter.current.every((skill) => person.resume.includes(skill))
      );
    }
    setDataState(filteredData);
  }

  function clearFilter() {
    setfiltering(false);
    //setSkillsFilter([]);
    skillsFilter.current = new Array();
    setPersonResume([]);
    setstartSkillIndex(null);
    setDataState(dataResume);
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center bg-cyan-200">
      <header className="w-full h-32 mb-16">
        <div className="w-full h-32 bg-bg-mob md:bg-bg-dsk bg-no-repeat bg-cover bg-blend-multiply bg-primary"></div>
      </header>
      {/* Filter */}
      {filtering && (
        <div className="flex h-20 w-4/5 items-center justify-between bg-white absolute top-24 rounded-lg shadow-xl">
          <div className="flex space-x-4 ml-4">
            {personResume.map((skill, index) => {
              return (
                <p
                  onClick={() => moreFilters(index)}
                  className="font-bold hover:cursor-pointer"
                  key={index}
                >
                  {/* Hide clicked skill that started the filtering */}
                  {index !== startSkillIndex ? skill : ""}
                </p>
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
