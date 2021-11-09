export async function fetchEvents() {
  try {
    const response = await fetch(
      "https://nextcourse-7e9b9-default-rtdb.firebaseio.com/events.json"
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function returnArrrayOfEvents() {
  const data = await fetchEvents();
  const transformedEvents = transformObjectToArray(data);
  return transformedEvents;
}
export async function getEventById(id) {
  const events = await returnArrrayOfEvents();
  const event = events.find((event) => event.id === id);
  return event;
}

export function getFeaturedEvents(array) {
  return array.filter((event) => event.isFeatured);
}

export function transformObjectToArray(object) {
  const array = [];
  for (let key in object) {
    array.push({
      ...object[key],
      id: key,
    });
  }
  return array;
}

export async function getFilteredEvents(dateFilter) {
  const events = await returnArrrayOfEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
