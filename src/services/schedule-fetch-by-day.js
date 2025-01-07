import dayjs from "dayjs"
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({date}) {
  try {
    //Faz requisição para a API
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)

    //Converte a resposta em JSON
    const data = await response.json()

    //Filtrar os agendamentos do dia
    const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))

    return dailySchedules
  } catch (error) {
    console.log(error)
    alert("Não foi possível carregar os agendamentos. Por favor, tente novamente mais tarde.")
  }
}