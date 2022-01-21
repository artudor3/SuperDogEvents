const events = [{
        id: 1,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        id: 2,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        id: 3,
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        id: 4,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        id: 5,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        id: 6,
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        id: 7,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        id: 8,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        id: 9,
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

//builds a list of distinct cities for our drop down.
function buildDropDown() {

    //grab the event drop down we want to add cities to
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";

    //load our links from a template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    //get a distinct list of cities, by filtering the array
    //let distinctCities = [...new Set(curEvents.map((e) => e.city))] 
    // condensed version of 2 lines below
    let cities = curEvents.map((e) => e.city);

    //return a list of distinct cities
    let distinctCities = [...new Set(cities)];

    //use the drop down template
    let ddItemTemplate = document.importNode(ddTemplate.content, true);
    let li = ddItemTemplate.querySelector("li");
    let ddItem = li.querySelector("a");
    ddItem.setAttribute("data-city", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(li);

    for (let i = 0; i < distinctCities.length; i++) {
        ddItemTemplate = document.importNode(ddTemplate.content, true);
        li = ddItemTemplate.querySelector("li");
        ddItem = ddItemTemplate.querySelector("a");
        ddItem.setAttribute("data-city", distinctCities[i]);
        ddItem.textContent = distinctCities[i];
        eventDD.appendChild(li);
    }

    //display the stats
    displayStats(curEvents);
    displayData();
}

//show the events for a specific location.
//the user selected a city and this fires.
function getEvents(element) {

    let city = element.getAttribute("data-city");
    curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    let filteredEvents = curEvents;

    //filter the events based on selected city
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        })
    }

    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;

    //display the stats for the selected city
    displayStats(filteredEvents);

    //display all data for the selected city 
    /*let tableData = "";
    let rowData = "";

    for (let i = 0; i < filteredEvents.length; i++) {
        rowData = `<tr><td>${filteredEvents[i].event}</td><td>${filteredEvents[i].city}</td><td>${filteredEvents[i].state}</td><td>${filteredEvents[i].attendance}</td><td>${filteredEvents[i].date}</td></tr>`
        tableData += rowData;
    }
    document.getElementById("eventBody").innerHTML = tableData;*/
}

function displayStats(filteredEvents) {
    //variable declarations
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        //calc total attendance
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        //calc most
        if (most < currentAttendance) {
            most = currentAttendance;
        }

        //calc least
        if (i == 0 || least > currentAttendance) {
            least = currentAttendance;
        }

    }

    //calc average
    average = total / filteredEvents.length;

    //print results
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();

    document.getElementById("average").innerHTML = average.toLocaleString(
        "en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );

}

function displayData() {
    let template = document.getElementById("eventData-template");

    let eventBody = document.getElementById("eventBody");

    //clear the table first
    eventBody.innerHTML = "";

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

    if (curEvents.length == 0) {
        curEvents = events;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }

    for (let i = 0; i < curEvents.length; i++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[i].event;
        eventCols[1].textContent = curEvents[i].city;
        eventCols[2].textContent = curEvents[i].state;
        eventCols[3].textContent = curEvents[i].attendance;
        eventCols[4].textContent = curEvents[i] = new Date(
            curEvents[i].date).toLocaleDateString();

        eventBody.appendChild(eventRow);
    }
}
function saveData(){
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    let obj = {};
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;
    let stateSel = document.getElementById("newEventState");
    obj["state"] = stateSel.options[stateSel.selectedIndex].text;
    obj["attendance"] = parseInt(document.getElementById("newEventAttendance").value,10);
    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`;
    obj["date"] = new Date(eventDate2).toLocaleString();

    curEvents.push(obj);

    localStorage.setItem("eventsArray", JSON.stringify(curEvents));

    buildDropDown();
    displayData();

}