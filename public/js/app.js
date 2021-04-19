const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messsageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value



    messageOne.textContent = 'Loading......'
    messsageTwo.textContent = ''


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then(({error, location, weather}) => {
            if(error) {
                messageOne.textContent =  error
            } else {
                messageOne.textContent = location
                messsageTwo.textContent = weather
            }
        })
    })
})
