import { Jot } from "../models/Jot.js";
import { HomeController } from "../controllers/HomeController.js";
import { AppState } from "../AppState.js";
import { saveState } from "../utils/Store.js";

function _saveJots() {
    saveState('jots', AppState.jots)
}

class JotsService {

    setActiveJot(jotName) {
        let foundJot = AppState.jots.find(jot => jot.name == jotName)
        AppState.activeJot = foundJot
        let jotTextArea = document.getElementById('jotTextArea')
        jotTextArea.innerHTML = foundJot.mytext
        const jotBg = document.getElementsByClassName('jot-bg')[0]
        jotBg.style.background = foundJot.color
        document.getElementById('jotTextArea').value = AppState.activeJot.mytext
        _saveJots()
        let jotTitle = document.getElementById('jot-title')
        jotTitle.innerHTML = AppState.activeJot.name
    }

    updateWordCount() {
        let textAreaone = document.getElementById('jotTextArea')
        AppState.activeJot.chars = textAreaone.value.length
        _saveJots()
    }

    createJot(formData) {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let fullDate = `${month}/${day}/${year}`
        let newJot = new Jot(formData)
        newJot.mydate = fullDate
        AppState.jots.push(newJot)
        _saveJots()
    }

    editJot() {
        AppState.activeJot.mytext = document.getElementById('jotTextArea').value
        let date = new Date()
        // MM DD YY TIME
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let fullDate = `${month}/${day}/${year}`
        // HOUR & CONVERSION
        let min = date.getMinutes()
        let hour = date.getHours()
        if (hour >= 13) {
            hour = hour - 12 + `:${min} PM`
        } else {
            hour = hour + `:${min} AM`
        }
        AppState.activeJot.updated = `${fullDate} @ ${hour}`
        console.log(AppState.activeJot)
        _saveJots()
    }

    deleteJot(jotId) {
        let filteredJots = AppState.jots.filter(jot => jot.id != jotId)
        AppState.jots = filteredJots
        _saveJots()
    }

}

export const jotsService = new JotsService()