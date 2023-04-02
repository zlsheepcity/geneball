// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const protons = {
    char: {
        A:'Aina', D:'Dina', F:'Funi',
        G:'Gina', H:'Hina', L:'Lina',
        M:'Mina', S:'Sina', T:'Tina',
        },
    chars: {
        A:[...'ABC'], D:[...'D'  ], F:[...'FU' ],
        G:[...'G'  ], H:[...'HJ' ], L:[...'L'  ],
        M:[...'M'  ], S:[...'S'  ], T:[...'T'  ],
        },
    charm: {
        A:1132, D:1231, F:1330,
        G:1321, H:1303, L:1312,
        M:1033, S:1213, T:1123,
        },
    chage: {
        A:13, D:33, F:11,
        G:31, H:21, L:12,
        M:23, S:32, T:22,
        },
};
const actions = {
  A:[
    { T:'Content CRM' },
    { T:'Update config' },
    { T:'Automized deploy' },
    ],
    D:[
      { T:'Experienced trick' },
      { T:'HotFix' },
      { T:'Skip check' },
      ],
      F:[
        { T:'Cheat' },
        { T:'Push master' },
        { T:'Discuss' },
        ],
  G:[
    { T:'Block issue' },
    { T:'Outsource' },
    { T:'Demo presentation' },
    ],
    H:[
      { T:'Keep' },
      { T:'Develop' },
      { T:'Skip Reports' },
      ],
      L:[
        { T:'Delegate' },
        { T:'Use libs' },
        { T:'Full test' },
        ],
  M:[
    { T:'Rush' },
    { T:'Block' },
    { T:'Documentation' },
    ],
    S:[
      { T:'Deep view' },
      { T:'Research' },
      { T:'Detailed check' },
      ],
      T:[
        { T:'Reject' },
        { T:'Refactoring' },
        { T:'Backlog' },
        ],
};
const profile = {
  A:{
    details:['core'],
    },
    D:{
      details:['data'],
      },
      F:{
        details:['fire'],
        },
  G:{
    details:['auth'],
    },
    H:{
      details:['cold'],
      },
      L:{
        },
  M:{
    details:['cold'],
    },
    S:{
      details:['mout'],
      },
      T:{
        details:['fire'],
        },
};
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GemCollection = function (source) {
  let seedpool = (O=> F=> Object.values(O).map(F))(source.char)(G=>G[0])
  let exctract = (char,data)=> (O,key)=>({...O, [key]:data[key][char] })
  let ribosome = (G)=> (D)=> Object.keys(D).reduce(exctract(G[0],D),{G})
  let Gem = seedpool.reduce((O,G)=>({...O,[G]:ribosome(G)(source)}), {})
  Object.assign(this,Gem)
};
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GEMDATA = { ...protons, actions, profile };
const GEM = new GemCollection(GEMDATA);
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
