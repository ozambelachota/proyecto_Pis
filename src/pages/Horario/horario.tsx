{
  /* import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./horario.style.css";
const HorarioPage = () => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const startTime = 7 * 60; // 7:00 AM en minutos
  const endTime = 22.5 * 60; // 10:30 PM en minutos
  const interval = 40; // Intervalo de 40 minutos

  const [activities, setActivities] = useState({});

  const handleActivityChange = (
    time: number,
    day: number,
    event: FormEvent
  ) => {
    const { value } = event.target;
    const key = `${time}-${day}`;

    setActivities((prevActivities) => ({
      ...prevActivities,
      [key]: value,
    }));
  };

  // Generar las filas y columnas del calendario
  const calendarRows = [];
  for (let time = startTime; time <= endTime; time += interval) {
    const hour = Math.floor(time / 60);
    const minutes = time % 60;
    const timeLabel = `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    const row = (
      <tr key={time}>
        <td className="time-cell">{timeLabel}</td>
        {daysOfWeek.map((day, index) => (
          <td key={day}>
            <input
              type="text"
              value={activities[`${time}-${index}`] || ""}
              onChange={(e) => handleActivityChange(time, index, e)}
              placeholder="Agregar actividad"
              className="activity-input "
            />
          </td>
        ))}
      </tr>
    );

    calendarRows.push(row);
  }

  return (
    <div className="calendar">
      <h1 className="title">Horarios del docente</h1>
      <Link to={"/home"} className="back-button">
        Regresar a Inicio
      </Link>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Hora</th>
            {daysOfWeek.map((day) => (
              <th className="day" key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
};

export default HorarioPage; */
}
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./horario.style.css";
const HorarioPage = () => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const startHour = 7; // Hora de inicio (7:00 AM)
  const endHour = 22; // Hora de fin (10:00 PM)
  const interval = 40; // Intervalo de 40 minutos

  const [activities, setActivities] = useState([]);

  const handleAddActivity = (event:FormEvent) => {
    event.preventDefault();

    const form = event.target;
    const startHour = parseInt(form.startHour.value);
    const endHour = parseInt(form.endHour.value);
    const selectedDay = form.day.value;
    const activity = form.activity.value;

    // Verificar que la hora de fin sea mayor que la de inicio
    if (startHour >= endHour) {
      alert("La hora de fin debe ser mayor que la hora de inicio");
      return;
    }

    // Calcular los índices de inicio y fin en base a las horas seleccionadas
    const startIndex = (startHour - 7) * 2;
    const endIndex = (endHour - 7) * 2 + 1;

    // Crear un nuevo objeto de actividad
    const newActivity = {
      startHour,
      endHour,
      day: selectedDay,
      activity,
      startIndex,
      endIndex,
    };

    // Agregar la nueva actividad al estado
    setActivities((prevActivities) => [...prevActivities, newActivity]);

    // Limpiar los campos del formulario
    form.reset();
  };

  // Generar las filas y columnas del calendario
  const calendarRows = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const timeLabel = `${hour.toString().padStart(2, "0")}:00`;

    const row = (
      <tr key={hour}>
        <td className="time-cell">{timeLabel}</td>
        {daysOfWeek.map((day, index) => {
          const activity = activities.find(
            (a) => a.day === day && a.startHour <= hour && a.endHour > hour
          );

          const cellStyle = {
            backgroundColor: activity ? activity.color : null,
          };

          return (
            <td key={day} style={cellStyle}>
              {activity && (
                <div className="activity" title={activity.activity}>
                  {activity.activity}
                </div>
              )}
            </td>
          );
        })}
      </tr>
    );

    calendarRows.push(row);
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="calendar-container">
      <h1 className="title">Horarios del docente</h1>
      <Link to={"/home"} className="btn btn-primary">
        Regresar a Inicio
      </Link>
      <form onSubmit={handleAddActivity} className="form">
        <div className="form-group">
          <label htmlFor="start-hour">Hora de inicio:</label>
          <select id="start-hour" name="startHour" required>
            {Array.from({ length: endHour - startHour + 1 }, (_, i) => (
              <option key={i} value={startHour + i}>
                {`${startHour + i}:00`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="end-hour">Hora de fin:</label>
          <select id="end-hour" name="endHour" required>
            {Array.from({ length: endHour - startHour + 1 }, (_, i) => (
              <option key={i} value={startHour + i}>
                {`${startHour + i}:00`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="day">Día:</label>
          <select id="day" name="day" required>
            <option value="">Selecciona un día</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="activity">Curso:</label>
          <input
            className="activity-input"
            type="text"
            id="activity"
            name="activity"
            required
          />
        </div>
        <button type="submit" className="small-button">
          Agregar curso
        </button>
      </form>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Hora</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
};


export default HorarioPage;
