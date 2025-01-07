import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")


//Gera o evento click para cada lista (manhã, tarde, noite)
periods.forEach((period) => {
  //Captura o evento de clique na lista
  period.addEventListener("click", async (event) => {

    if(event.target.classList.contains("cancel-icon")){
      //Obtém a li pai do elemento clicado
      const item = event.target.closest("li")
      //Obtém o id do agendamento
      const { id } = item.dataset

      //Confirma se o id foi selecionado
      if(id) {
        //Confirma e o usuário deseja cancelar o agendamento
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        )

        if(isConfirm) {
          //Faz a requisição na API para cancelar o agendamento
          await scheduleCancel({id})

          //Recarrega os agendamentos
          schedulesDay()
        }
      }
    }
  })

})