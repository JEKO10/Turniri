"use client";

import React, { useEffect, useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import * as z from "zod";

import { TournamentSchema } from "@/schemas";
interface ParticipantsFormatProps {
  isBlank: boolean;
  formData: z.infer<typeof TournamentSchema>;
  setFormData: React.Dispatch<
    React.SetStateAction<z.infer<typeof TournamentSchema>>
  >;
}

const ParticipantsFormat = ({
  isBlank,
  formData,
  setFormData,
}: ParticipantsFormatProps) => {
  const [participants, setParticipants] = useState(2);
  const [teams, setTeams] = useState("");

  useEffect(() => {
    const teamArray = teams
      .split("\n")
      .map((team) => team.trim())
      .filter((team) => team.length > 0);

    const uniqueTeamArray = Array.from(new Set(teamArray));

    setFormData({ ...formData, teams: uniqueTeamArray });
  }, [teams]);

  useEffect(() => {
    if (participants < 2) {
      setFormData({ ...formData, participants: 2 });
    } else if (participants > 256) {
      setFormData({ ...formData, participants: 256 });
    } else {
      setFormData({ ...formData, participants });
    }
  }, [participants]);

  if (isBlank) {
    return (
      <section>
        <p className="text-2xl italic font-medium">Unesite broj učesnika</p>
        <article className="flex items-center justify-start my-5">
          <button
            type="button"
            className="bg-primary px-5 cursor-pointer rounded-l-md"
            onClick={() => setParticipants(participants - 1)}
            disabled={participants === 2}
          >
            <PiMinus className="text-text h-8 text-xl" />
          </button>
          <div className="bg-accent w-48 p-1 flex items-center justify-center">
            <input
              className="bg-accent w-full text-center outline-none"
              type="number"
              onChange={(event) =>
                setParticipants(parseInt(event.target.value))
              }
              value={participants}
              min={2}
              max={256}
            />
          </div>
          <button
            type="button"
            className="bg-primary px-5 cursor-pointer rounded-r-md"
            onClick={() => setParticipants(participants + 1)}
            disabled={participants === 256}
          >
            <PiPlus className="text-text h-8 text-xl" />
          </button>
        </article>
      </section>
    );
  }
  return (
    <article>
      <p className="text-2xl italic font-medium">Učesnici</p>
      <p className="italic mt-2">
        Jedan ispod drugog, od najboljeg ka najlošijem
      </p>
      <textarea
        className="bg-primary text-base text-text w-1/2 h-60 my-2 py-4 px-5 resize-none rounded-md outline-none placeholder-text"
        placeholder="Unesite učesnike, jedan učesnik ispod drugog"
        onChange={(event) => setTeams(event.target.value)}
      />
      <label className="flex align-center justify-start flex-col w-fit">
        <div className="flex align-center justify-start cursor-pointer">
          <input
            type="checkbox"
            className="w-5 mr-3"
            onChange={(event) =>
              setFormData({ ...formData, randomize: event.target.checked })
            }
          />
          <p className="text-base opacity-65 italic select-none">
            Nasumično rasporedi takmičare
          </p>
        </div>
      </label>
    </article>
  );
};

export default ParticipantsFormat;