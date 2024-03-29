// fetch('https://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = ''
    messageSecond.textContent = 'Loading...'
            

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
            }
        })
    })
})