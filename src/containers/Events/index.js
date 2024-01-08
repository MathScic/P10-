import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [selectedType, setSelectedType] = useState("toutes");
  const [currentPage, setCurrentPage] = useState(1);

  const changeTypeFromSelect = (evtType) => {
    setSelectedType(evtType);
    setCurrentPage(1);
  };

  const filteredEvents =
    (!selectedType || selectedType === "toutes"
      ? data?.events
      : data?.events.filter((event) => event.type === selectedType)) || [];
  const offset = (currentPage - 1) * PER_PAGE;
  const paginatedEvents = filteredEvents.slice(offset, offset + PER_PAGE);

  let typeList;
  let pageNumber;

  if (data?.events) {
    const allowedTypes = [
      "conférence",
      "expérience digitale",
      "soirée entreprise",
    ];
    typeList = allowedTypes;
  } else {
    typeList = [];
  }

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) =>
              changeTypeFromSelect(value === "Toutes" ? null : value)
            }
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
