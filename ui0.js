const wrap = document.getElementsByTagName('body')[0]
const btnAddSheepToSquad0 = document.createElement('button')
btnAddSheepToSquad0.innerText = 'btnAddSheepToSquad0'
btnAddSheepToSquad0.addEventListener('click', e => {
    game.registerPlayer()
    log('Squad', game.Squad)
});
wrap.append(btnAddSheepToSquad0)
