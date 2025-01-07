import dayjs from "dayjs"
import { schedulesDay } from "../schedules/load.js"
import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

//Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data minima como sendo a data atual.
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = clientName.value.trim()

    if(!name) {
      return alert("Por favor, Informe o nome do cliente")
    }

    //Recupera o horário selecionado
    const hourSelected = document.querySelector(".hour-selected")

    //Validação do campo de horário 
    if(!hourSelected) {
      return alert("Por favor, selecione um horário")
    }

    //Recupera somente a hora
    const [hour] = hourSelected.innerText.split(":")

    //Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")

    //Gera um ID
    const id = new Date().getTime()

    //Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    })

    //Recarregar os agendamentos
    await schedulesDay()
    
    //Limpa o formulário
    clientName.value = ""
    
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}
