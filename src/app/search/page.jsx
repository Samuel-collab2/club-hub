"use client"

import { useEffect, useState } from "react";
import SearchItem from "../components/SearchItem";
import ReactLoading from "react-loading";
import { FilterButton, FilterContainer, FilterLabel, KeywordInput, SelectComponent, PageButton} from "./styled"


const defaultFilters = {
    keyword: "",
    pageSize: 10,
    page: 1,
    sort: "desc",
    campusId: undefined,
    clubOrEvent: "both",
    includePastEvents: false,
}

export default function Home() {

    const [filters, setFilters] = useState({
      keyword: defaultFilters.keyword,
      pageSize: defaultFilters.pageSize,
      page: defaultFilters.page,
      sort: defaultFilters.sort,
      campusId: defaultFilters.campusId,
      clubOrEvent: defaultFilters.clubOrEvent,
      includePastEvents: defaultFilters.includePastEvents
    });

      const [data, setData] = useState({ data: [{
        "name": "",
        "description": "",
        "banner": "",
      }]})

    const getQueryParameters = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            keyword: params.get("keyword"),
            pageSize: parseInt(params.get("pageSize")) || defaultFilters.pageSize,
            page: parseInt(params.get("page")) || defaultFilters.page,
            sort: params.get("sort") || defaultFilters.sort,
            campusId: parseInt(params.get("campusId")) || defaultFilters.campusId,
            clubOrEvent: params.get("clubOrEvent") || defaultFilters.clubOrEvent,
            includePastEvents: params.get("includePastEvents") === "true" || defaultFilters.includePastEvents
          };
    };

    const switchLoadingPage = (loading) => {
        if (loading) {
          document.body.style.cursor = "wait";
          document.getElementById("items-list").style.display = "none";
          document.getElementById("loading-sign").style.display = "block";
        } else {
          document.body.style.cursor = "default";
          document.getElementById("items-list").style.display = "block";
          document.getElementById("loading-sign").style.display = "none";
        }
    }

    useEffect(() => {
        const initialFilters = getQueryParameters();
        filters.keyword = initialFilters.keyword;
        sendQuery();
      }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
      if(filters.clubOrEvent === "club"){
        document.getElementById("include-past-events").style.display = "none";
      } else {
        document.getElementById("include-past-events").style.display = "block";
      }
    }, [filters.clubOrEvent])
    
    const sendQuery = async () => {
        switchLoadingPage(true);
        const response = await fetch("/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...filters}),
        });

        const dataResponse = await response.json();
        setData(dataResponse)
        switchLoadingPage(false);
      };

    const resetFilters = () => {
        setFilters({
            keyword: "",
            pageSize: 10,
            page: 1,
            sort: "desc",
            campusId: 2,
            clubOrEvent: "club",
            includePastEvents: false,
          });
    };

    const [nearestPages, setNearestPages] = useState([1, 2, 3, 4, 5]);

    const handlePageChange = (newPage) => {
      filters.page = newPage;
      setNearestPages(getNearestPages());
      sendQuery();
    };
  
    const getNearestPages = () => {
      let nearestPages = [];
      console.log(filters.page)
      for (let i = filters.page; nearestPages.length < 5; i++) {
        // Add pages before current page
        if (filters.page !== i && i > 3) {
          nearestPages.push(i-3);
        }
      }
      return nearestPages;
    };

  return (
<div>
      <h2>Filters</h2>
      <FilterContainer>
        <FilterLabel>
          Keyword
          <KeywordInput
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
          />
        </FilterLabel>
        <FilterLabel>
          Page Size
          <SelectComponent name="pageSize" value={filters.pageSize} onChange={handleFilterChange}>
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </SelectComponent>
        </FilterLabel>
        <FilterLabel>
          Sort
          <SelectComponent name="sort" value={filters.sort} onChange={handleFilterChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </SelectComponent>
        </FilterLabel>
        <FilterLabel>
          Campus
          <SelectComponent name="campusId" value={filters.campusId} onChange={handleFilterChange}>
            <option value="2">Downtown Campus</option>
            <option value="3">Burnaby Campus</option>
            <option value={undefined}>Both</option>
          </SelectComponent>
        </FilterLabel>
        <FilterLabel>
          Club/Event
          <SelectComponent name="clubOrEvent" value={filters.clubOrEvent} onChange={handleFilterChange}>
            <option value="club">Club</option>
            <option value="event">Event</option>
            <option value="both">Both</option>
          </SelectComponent>
        </FilterLabel>
        <FilterLabel id="include-past-events" >
          Past Events
          <SelectComponent style={{marginTop: "5px"}}
            name="includePastEvents"
            value={filters.includePastEvents}
            onChange={handleFilterChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </SelectComponent>
        </FilterLabel>
        <FilterButton onClick={sendQuery}>Search</FilterButton>
        <FilterButton onClick={resetFilters}>Reset Filters</FilterButton>
      </FilterContainer>

      <div id="loading-sign">
        <ReactLoading   type={"cubes"} color={"#808080"}height={100} width={100} />
      </div>

      <div id="items-list">
            {data.data.map((item, index) => (
              <div key={index}>
                  <hr style={{height: "1px", width: "90%", background: "#d3d3d3" }}></hr>
                  <SearchItem  {...item} />
              </div>)
            )}
      </div>

      <div style={{margin: "20px", justifyContent: "center",  display: "flex", gap: "5px"}}>
        {nearestPages.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            type="button"
            onClick={() => handlePageChange(pageNumber)}
            style={{ margin: '0 5px' }}
          >
            {pageNumber}
          </PageButton>
        ))}
      </div>

    </div>
  );
}

