import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { schedulesShow } from "../schedules/show.js"
import { hoursLoad } from '../form/hours-load.js';

//Seleciona o input de data
const selectedDate = document.getElementById('date');

export async function schedulesDay() {

  //Obtém da data do input
  const date = selectedDate.value;

  //Buscar na API os agendamentos do dia
  const dailySchedules = await scheduleFetchByDay({ date })
  
  //Exibe os agendamentos do dia
  schedulesShow({ dailySchedules });

  //Renderiza as horas disponíveis
  hoursLoad({ date, dailySchedules });
}
