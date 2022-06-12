const NameWizard = base => {
    const Header = 'DMNLTGH'
    const Bodies = ['ina','ora','ana','iko','uni']
    const f = oo => oo[Math.floor( Math.random()*oo.length )]
    return (base || f(Header)) + f(Bodies);
};