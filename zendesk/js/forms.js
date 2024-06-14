class User {
	constructor(phoneNumber, email, birthDate, password, firstName, lastName, patronymic, username) {
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.birthDate = birthDate;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.patronymic = patronymic;
		this.username = username;
	}

	static from(raw) {
		return new User(
			raw.phoneNumber,
			raw.email,
			raw.birthDate,
			raw.password,
			raw.firstName,
			raw.lastName,
			raw.patronymic,
			raw.username
		);
	}
}

const MIN_USER_AGE = 16;
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "@$!%*?&";
const PASSWORD_CHARS_POOL = UPPERCASE + LOWERCASE + DIGITS + SPECIAL;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
const MIN_NICKNAME_ATTEMPTS = 5;
const ENGLISH_REGEX = /^[A-Za-z]+$/;
const RANDOM_WORDS_FIRST = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing","ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual","another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic","ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic","authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back","baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big","big-hearted","biodegradable","bite-sized","bitter","black","black-and-white","bland","blank","blaring","bleak","blind","blissful","blond","blue","blushing","bogus","boiling","bold","bony","boring","bossy","both","bouncy","bountiful","bowed","brave","breakable","brief","bright","brilliant","brisk","broken","bronze","brown","bruised","bubbly","bulky","bumpy","buoyant","burdensome","burly","bustling","busy","buttery","buzzing","calculating","calm","candid","canine","capital","carefree","careful","careless","caring","cautious","cavernous","celebrated","charming","cheap","cheerful","cheery","chief","chilly","chubby","circular","classic","clean","clear","clear-cut","clever","close","closed","cloudy","clueless","clumsy","cluttered","coarse","cold","colorful","colorless","colossal","comfortable","common","compassionate","competent","complete","complex","complicated","composed","concerned","concrete","confused","conscious","considerate","constant","content","conventional","cooked","cool","cooperative","coordinated","corny","corrupt","costly","courageous","courteous","crafty","crazy","creamy","creative","creepy","criminal","crisp","critical","crooked","crowded","cruel","crushing","cuddly","cultivated","cultured","cumbersome","curly","curvy","cute","cylindrical","damaged","damp","dangerous","dapper","daring","darling","dark","dazzling","dead","deadly","deafening","dear","dearest","decent","decimal","decisive","deep","defenseless","defensive","defiant","deficient","definite","definitive","delayed","delectable","delicious","delightful","delirious","demanding","dense","dental","dependable","dependent","descriptive","deserted","detailed","determined","devoted","different","difficult","digital","diligent","dim","dimpled","dimwitted","direct","disastrous","discrete","disfigured","disgusting","disloyal","dismal","distant","downright","dreary","dirty","disguised","dishonest","dismal","distant","distinct","distorted","dizzy","dopey","doting","double","downright","drab","drafty","dramatic","dreary","droopy","dry","dual","dull","dutiful","each","eager","earnest","early","easy","easy-going","ecstatic","edible","educated","elaborate","elastic","elated","elderly","electric","elegant","elementary","elliptical","embarrassed","embellished","eminent","emotional","empty","enchanted","enchanting","energetic","enlightened","enormous","enraged","entire","envious","equal","equatorial","essential","esteemed","ethical","euphoric","even","evergreen","everlasting","every","evil","exalted","excellent","exemplary","exhausted","excitable","excited","exciting","exotic","expensive","experienced","expert","extraneous","extroverted","extra-large","extra-small","fabulous","failing","faint","fair","faithful","fake","false","familiar","famous","fancy","fantastic","far","faraway","far-flung","far-off","fast","fat","fatal","fatherly","favorable","favorite","fearful","fearless","feisty","feline","female","feminine","few","fickle","filthy","fine","finished","firm","first","firsthand","fitting","fixed","flaky","flamboyant","flashy","flat","flawed","flawless","flickering","flimsy","flippant","flowery","fluffy","fluid","flustered","focused","fond","foolhardy","foolish","forceful","forked","formal","forsaken","forthright","fortunate","fragrant","frail","frank","frayed","free","French","fresh","frequent","friendly","frightened","frightening","frigid","frilly","frizzy","frivolous","front","frosty","frozen","frugal","fruitful","full","fumbling","functional","funny","fussy","fuzzy","gargantuan","gaseous","general","generous","gentle","genuine","giant","giddy","gigantic","gifted","giving","glamorous","glaring","glass","gleaming","gleeful","glistening","glittering","gloomy","glorious","glossy","glum","golden","good","good-natured","gorgeous","graceful","gracious","grand","grandiose","granular","grateful","grave","gray","great","greedy","green","gregarious","grim","grimy","gripping","grizzled","gross","grotesque","grouchy","grounded","growing","growling","grown","grubby","gruesome","grumpy","guilty","gullible","gummy","hairy","half","handmade","handsome","handy","happy","happy-go-lucky","hard","hard-to-find","harmful","harmless","harmonious","harsh","hasty","hateful","haunting","healthy","heartfelt","hearty","heavenly","heavy","hefty","helpful","helpless","hidden","hideous","high","high-level","hilarious","hoarse","hollow","homely","honest","honorable","honored","hopeful","horrible","hospitable","hot","huge","humble","humiliating","humming","humongous","hungry","hurtful","husky","icky","icy","ideal","idealistic","identical","idle","idiotic","idolized","ignorant","ill","illegal","ill-fated","ill-informed","illiterate","illustrious","imaginary","imaginative","immaculate","immaterial","immediate","immense","impassioned","impeccable","impartial","imperfect","imperturbable","impish","impolite","important","impossible","impractical","impressionable","impressive","improbable","impure","inborn","incomparable","incompatible","incomplete","inconsequential","incredible","indelible","inexperienced","indolent","infamous","infantile","infatuated","inferior","infinite","informal","innocent","insecure","insidious","insignificant","insistent","instructive","insubstantial","intelligent","intent","intentional","interesting","internal","international","intrepid","ironclad","irresponsible","irritating","itchy","jaded","jagged","jam-packed","jaunty","jealous","jittery","joint","jolly","jovial","joyful","joyous","jubilant","judicious","juicy","jumbo","junior","jumpy","juvenile","kaleidoscopic","keen","key","kind","kindhearted","kindly","klutzy","knobby","knotty","knowledgeable","knowing","known","kooky","kosher","lame","lanky","large","last","lasting","late","lavish","lawful","lazy","leading","lean","leafy","left","legal","legitimate","light","lighthearted","likable","likely","limited","limp","limping","linear","lined","liquid","little","live","lively","livid","loathsome","lone","lonely","long","long-term","loose","lopsided","lost","loud","lovable","lovely","loving","low","loyal","lucky","lumbering","luminous","lumpy","lustrous","luxurious","mad","made-up","magnificent","majestic","major","male","mammoth","married","marvelous","masculine","massive","mature","meager","mealy","mean","measly","meaty","medical","mediocre","medium","meek","mellow","melodic","memorable","menacing","merry","messy","metallic","mild","milky","mindless","miniature","minor","minty","miserable","miserly","misguided","misty","mixed","modern","modest","moist","monstrous","monthly","monumental","moral","mortified","motherly","motionless","mountainous","muddy","muffled","multicolored","mundane","murky","mushy","musty","muted","mysterious","naive","narrow","nasty","natural","naughty","nautical","near","neat","necessary","needy","negative","neglected","negligible","neighboring","nervous","new","next","nice","nifty","nimble","nippy","nocturnal","noisy","nonstop","normal","notable","noted","noteworthy","novel","noxious","numb","nutritious","nutty","obedient","obese","oblong","oily","oblong","obvious","occasional","odd","oddball","offbeat","offensive","official","old","old-fashioned","only","open","optimal","optimistic","opulent","orange","orderly","organic","ornate","ornery","ordinary","original","other","our","outlying","outgoing","outlandish","outrageous","outstanding","oval","overcooked","overdue","overjoyed","overlooked","palatable","pale","paltry","parallel","parched","partial","passionate","past","pastel","peaceful","peppery","perfect","perfumed","periodic","perky","personal","pertinent","pesky","pessimistic","petty","phony","physical","piercing","pink","pitiful","plain","plaintive","plastic","playful","pleasant","pleased","pleasing","plump","plush","polished","polite","political","pointed","pointless","poised","poor","popular","portly","posh","positive","possible","potable","powerful","powerless","practical","precious","present","prestigious","pretty","precious","previous","pricey","prickly","primary","prime","pristine","private","prize","probable","productive","profitable","profuse","proper","proud","prudent","punctual","pungent","puny","pure","purple","pushy","putrid","puzzled","puzzling","quaint","qualified","quarrelsome","quarterly","queasy","querulous","questionable","quick","quick-witted","quiet","quintessential","quirky","quixotic","quizzical","radiant","ragged","rapid","rare","rash","raw","recent","reckless","rectangular","ready","real","realistic","reasonable","red","reflecting","regal","regular","reliable","relieved","remarkable","remorseful","remote","repentant","required","respectful","responsible","repulsive","revolving","rewarding","rich","rigid","right","ringed","ripe","roasted","robust","rosy","rotating","rotten","rough","round","rowdy","royal","rubbery","rundown","ruddy","rude","runny","rural","rusty","sad","safe","salty","same","sandy","sane","sarcastic","sardonic","satisfied","scaly","scarce","scared","scary","scented","scholarly","scientific","scornful","scratchy","scrawny","second","secondary","second-hand","secret","self-assured","self-reliant","selfish","sentimental","separate","serene","serious","serpentine","several","severe","shabby","shadowy","shady","shallow","shameful","shameless","sharp","shimmering","shiny","shocked","shocking","shoddy","short","short-term","showy","shrill","shy","sick","silent","silky","silly","silver","similar","simple","simplistic","sinful","single","sizzling","skeletal","skinny","sleepy","slight","slim","slimy","slippery","slow","slushy","small","smart","smoggy","smooth","smug","snappy","snarling","sneaky","sniveling","snoopy","sociable","soft","soggy","solid","somber","some","spherical","sophisticated","sore","sorrowful","soulful","soupy","sour","Spanish","sparkling","sparse","specific","spectacular","speedy","spicy","spiffy","spirited","spiteful","splendid","spotless","spotted","spry","square","squeaky","squiggly","stable","staid","stained","stale","standard","starchy","stark","starry","steep","sticky","stiff","stimulating","stingy","stormy","straight","strange","steel","strict","strident","striking","striped","strong","studious","stunning","stupendous","stupid","sturdy","stylish","subdued","submissive","substantial","subtle","suburban","sudden","sugary","sunny","super","superb","superficial","superior","supportive","sure-footed","surprised","suspicious","svelte","sweaty","sweet","sweltering","swift","sympathetic","tall","talkative","tame","tan","tangible","tart","tasty","tattered","taut","tedious","teeming","tempting","tender","tense","tepid","terrible","terrific","testy","thankful","that","these","thick","thin","third","thirsty","this","thorough","thorny","those","thoughtful","threadbare","thrifty","thunderous","tidy","tight","timely","tinted","tiny","tired","torn","total","tough","traumatic","treasured","tremendous","tragic","trained","tremendous","triangular","tricky","trifling","trim","trivial","troubled","true","trusting","trustworthy","trusty","truthful","tubby","turbulent","twin","ugly","ultimate","unacceptable","unaware","uncomfortable","uncommon","unconscious","understated","unequaled","uneven","unfinished","unfit","unfolded","unfortunate","unhappy","unhealthy","uniform","unimportant","unique","united","unkempt","unknown","unlawful","unlined","unlucky","unnatural","unpleasant","unrealistic","unripe","unruly","unselfish","unsightly","unsteady","unsung","untidy","untimely","untried","untrue","unused","unusual","unwelcome","unwieldy","unwilling","unwitting","unwritten","upbeat","upright","upset","urban","usable","used","useful","useless","utilized","utter","vacant","vague","vain","valid","valuable","vapid","variable","vast","velvety","venerated","vengeful","verifiable","vibrant","vicious","victorious","vigilant","vigorous","villainous","violet","violent","virtual","virtuous","visible","vital","vivacious","vivid","voluminous","wan","warlike","warm","warmhearted","warped","wary","wasteful","watchful","waterlogged","watery","wavy","wealthy","weak","weary","webbed","wee","weekly","weepy","weighty","weird","welcome","well-documented","well-groomed","well-informed","well-lit","well-made","well-off","well-to-do","well-worn","wet","which","whimsical","whirlwind","whispered","white","whole","whopping","wicked","wide","wide-eyed","wiggly","wild","willing","wilted","winding","windy","winged","wiry","wise","witty","wobbly","woeful","wonderful","wooden","woozy","wordy","worldly","worn","worried","worrisome","worse","worst","worthless","worthwhile","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];
const RANDOM_WORDS_SECOND = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","news","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president","unit","category","cigarette","context","introduction","opportunity","performance","driver","flight","length","magazine","newspaper","relationship","teaching","cell","dealer","debate","finding","lake","member","message","phone","scene","appearance","association","concept","customer","death","discussion","housing","inflation","insurance","mood","woman","advice","blood","effort","expression","importance","opinion","payment","reality","responsibility","situation","skill","statement","wealth","application","city","county","depth","estate","foundation","grandmother","heart","perspective","photo","recipe","studio","topic","collection","depression","imagination","passion","percentage","resource","setting","ad","agency","college","connection","criticism","debt","description","memory","patience","secretary","solution","administration","aspect","attitude","director","personality","psychology","recommendation","response","selection","storage","version","alcohol","argument","complaint","contract","emphasis","highway","loss","membership","possession","preparation","steak","union","agreement","cancer","currency","employment","engineering","entry","interaction","limit","mixture","preference","region","republic","seat","tradition","virus","actor","classroom","delivery","device","difficulty","drama","election","engine","football","guidance","hotel","match","owner","priority","protection","suggestion","tension","variation","anxiety","atmosphere","awareness","bread","climate","comparison","confusion","construction","elevator","emotion","employee","employer","guest","height","leadership","mall","manager","operation","recording","respect","sample","transportation","boring","charity","cousin","disaster","editor","efficiency","excitement","extent","feedback","guitar","homework","leader","mom","outcome","permission","presentation","promotion","reflection","refrigerator","resolution","revenue","session","singer","tennis","basket","bonus","cabinet","childhood","church","clothes","coffee","dinner","drawing","hair","hearing","initiative","judgment","lab","measurement","mode","mud","orange","poetry","police","possibility","procedure","queen","ratio","relation","restaurant","satisfaction","sector","signature","significance","song","tooth","town","vehicle","volume","wife","accident","airport","appointment","arrival","assumption","baseball","chapter","committee","conversation","database","enthusiasm","error","explanation","farmer","gate","girl","hall","historian","hospital","injury","instruction","maintenance","manufacturer","meal","perception","pie","poem","presence","proposal","reception","replacement","revolution","river","son","speech","tea","village","warning","winner","worker","writer","assistance","breath","buyer","chest","chocolate","conclusion","contribution","cookie","courage","desk","drawer","establishment","examination","garbage","grocery","honey","impression","improvement","independence","insect","inspection","inspector","king","ladder","menu","penalty","piano","potato","profession","professor","quantity","reaction","requirement","salad","sister","supermarket","tongue","weakness","wedding","affair","ambition","analyst","apple","assignment","assistant","bathroom","bedroom","beer","birthday","celebration","championship","cheek","client","consequence","departure","diamond","dirt","ear","fortune","friendship","funeral","gene","girlfriend","hat","indication","intention","lady","midnight","negotiation","obligation","passenger","pizza","platform","poet","pollution","recognition","reputation","shirt","speaker","stranger","surgery","sympathy","tale","throat","trainer","uncle","youth","time","work","film","water","money","example","while","business","study","game","life","form","air","day","place","number","part","field","fish","back","process","heat","hand","experience","job","book","end","point","type","home","economy","value","body","market","guide","interest","state","radio","course","company","price","size","card","list","mind","trade","line","care","group","risk","word","fat","force","key","light","training","name","school","top","amount","level","order","practice","research","sense","service","piece","web","boss","sport","fun","house","page","term","test","answer","sound","focus","matter","kind","soil","board","oil","picture","access","garden","range","rate","reason","future","site","demand","exercise","image","case","cause","coast","action","age","bad","boat","record","result","section","building","mouse","cash","class","period","plan","store","tax","side","subject","space","rule","stock","weather","chance","figure","man","model","source","beginning","earth","program","chicken","design","feature","head","material","purpose","question","rock","salt","act","birth","car","dog","object","scale","sun","note","profit","rent","speed","style","war","bank","craft","half","inside","outside","standard","bus","exchange","eye","fire","position","pressure","stress","advantage","benefit","box","frame","issue","step","cycle","face","item","metal","paint","review","room","screen","structure","view","account","ball","discipline","medium","share","balance","bit","black","bottom","choice","gift","impact","machine","shape","tool","wind","address","average","career","culture","morning","pot","sign","table","task","condition","contact","credit","egg","hope","ice","network","north","square","attempt","date","effect","link","post","star","voice","capital","challenge","friend","self","shot","brush","couple","exit","front","function","lack","living","plant","plastic","spot","summer","taste","theme","track","wing","brain","button","click","desire","foot","gas","influence","notice","rain","wall","base","damage","distance","feeling","pair","savings","staff","sugar","target","text","animal","author","budget","discount","file","ground","lesson","minute","officer","phase","reference","register","sky","stage","stick","title","trouble","bowl","bridge","campaign","character","club","edge","evidence","fan","letter","lock","maximum","novel","option","pack","park","quarter","skin","sort","weight","baby","background","carry","dish","factor","fruit","glass","joint","master","muscle","red","strength","traffic","trip","vegetable","appeal","chart","gear","ideal","kitchen","land","log","mother","net","party","principle","relative","sale","season","signal","spirit","street","tree","wave","belt","bench","commission","copy","drop","minimum","path","progress","project","sea","south","status","stuff","ticket","tour","angle","blue","breakfast","confidence","daughter","degree","doctor","dot","dream","duty","essay","father","fee","finance","hour","juice","luck","milk","mouth","peace","pipe","stable","storm","substance","team","trick","afternoon","bat","beach","blank","catch","chain","consideration","cream","crew","detail","gold","interview","kid","mark","mission","pain","pleasure","score","screw","sex","shop","shower","suit","tone","window","agent","band","bath","block","bone","calendar","candidate","cap","coat","contest","corner","court","cup","district","door","east","finger","garage","guarantee","hole","hook","implement","layer","lecture","lie","manner","meeting","nose","parking","partner","profile","rice","routine","schedule","swimming","telephone","tip","winter","airline","bag","battle","bed","bill","bother","cake","code","curve","designer","dimension","dress","ease","emergency","evening","extension","farm","fight","gap","grade","holiday","horror","horse","host","husband","loan","mistake","mountain","nail","noise","occasion","package","patient","pause","phrase","proof","race","relief","sand","sentence","shoulder","smoke","stomach","string","tourist","towel","vacation","west","wheel","wine","arm","aside","associate","bet","blow","border","branch","breast","brother","buddy","bunch","chip","coach","cross","document","draft","dust","expert","floor","god","golf","habit","iron","judge","knife","landscape","league","mail","mess","native","opening","parent","pattern","pin","pool","pound","request","salary","shame","shelter","shoe","silver","tackle","tank","trust","assist","bake","bar","bell","bike","blame","boy","brick","chair","closet","clue","collar","comment","conference","devil","diet","fear","fuel","glove","jacket","lunch","monitor","mortgage","nurse","pace","panic","peak","plane","reward","row","sandwich","shock","spite","spray","surprise","till","transition","weekend","welcome","yard","alarm","bend","bicycle","bite","blind","bottle","cable","candle","clerk","cloud","concert","counter","flower","grandfather","harm","knee","lawyer","leather","load","mirror","neck","pension","plate","purple","ruin","ship","skirt","slice","snow","specialist","stroke","switch","trash","tune","zone","anger","award","bid","bitter","boot","bug","camp","candy","carpet","cat","champion","channel","clock","comfort","cow","crack","engineer","entrance","fault","grass","guy","hell","highlight","incident","island","joke","jury","leg","lip","mate","motor","nerve","passage","pen","pride","priest","prize","promise","resident","resort","ring","roof","rope","sail","scheme","script","sock","station","toe","tower","truck","witness","can","will","other","use","make","good","look","help","go","great","being","still","public","read","keep","start","give","human","local","general","specific","long","play","feel","high","put","common","set","change","simple","past","big","possible","particular","major","personal","current","national","cut","natural","physical","show","try","check","second","call","move","pay","let","increase","single","individual","turn","ask","buy","guard","hold","main","offer","potential","professional","international","travel","cook","alternative","special","working","whole","dance","excuse","cold","commercial","low","purchase","deal","primary","worth","fall","necessary","positive","produce","search","present","spend","talk","creative","tell","cost","drive","green","support","glad","remove","return","run","complex","due","effective","middle","regular","reserve","independent","leave","original","reach","rest","serve","watch","beautiful","charge","active","break","negative","safe","stay","visit","visual","affect","cover","report","rise","walk","white","junior","pick","unique","classic","final","lift","mix","private","stop","teach","western","concern","familiar","fly","official","broad","comfortable","gain","rich","save","stand","young","heavy","lead","listen","valuable","worry","handle","leading","meet","release","sell","finish","normal","press","ride","secret","spread","spring","tough","wait","brown","deep","display","flow","hit","objective","shoot","touch","cancel","chemical","cry","dump","extreme","push","conflict","eat","fill","formal","jump","kick","opposite","pass","pitch","remote","total","treat","vast","abuse","beat","burn","deposit","print","raise","sleep","somewhere","advance","consist","dark","double","draw","equal","fix","hire","internal","join","kill","sensitive","tap","win","attack","claim","constant","drag","drink","guess","minor","pull","raw","soft","solid","wear","weird","wonder","annual","count","dead","doubt","feed","forever","impress","repeat","round","sing","slide","strip","wish","combine","command","dig","divide","equivalent","hang","hunt","initial","march","mention","spiritual","survey","tie","adult","brief","crazy","escape","gather","hate","prior","repair","rough","sad","scratch","sick","strike","employ","external","hurt","illegal","laugh","lay","mobile","nasty","ordinary","respond","royal","senior","split","strain","struggle","swim","train","upper","wash","yellow","convert","crash","dependent","fold","funny","grab","hide","miss","permit","quote","recover","resolve","roll","sink","slip","spare","suspect","sweet","swing","twist","upstairs","usual","abroad","brave","calm","concentrate","estimate","grand","male","mine","prompt","quiet","refuse","regret","reveal","rush","shake","shift","shine","steal","suck","surround","bear","brilliant","dare","dear","delay","drunk","female","hurry","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];
const NICKNAME_SEPARATOR = ".";

const SIGN_UP_FORM_VISIBLE_CLASS = "sign-up-form-frame-visible";
const NO_SCROLL_CLASS = "no-scroll";

let authUser;

let users = [];
let compromisedPasswords = [];
let bodyElement = document.getElementById("body");
let signUpFormContainer = document.getElementById("sign-up-form-frame");
let signInFormContainer = document.getElementById("sign-in-form-frame");
let signUpForm = document.getElementById("sign-up-form-inputs-frame");
let signInForm = document.getElementById("sign-in-form-inputs-frame");
let phoneInput = document.getElementById("sign-up-form-inputs-phone-number-input");
let phoneError = document.getElementById("sign-up-form-inputs-phone-number-validation");
let phoneCountry = document.getElementById("sign-up-form-inputs-phone-number-country-code");
let phoneOperator = document.getElementById("sign-up-form-inputs-phone-operator-code-input");
let emailInput = document.getElementById("sign-up-form-inputs-email");
let emailError = document.getElementById("sign-up-form-inputs-email-validation");
let dobInput = document.getElementById("sign-up-form-inputs-dob");
let dobError = document.getElementById("sign-up-form-inputs-dob-validation");
let firstNameInput = document.getElementById("sign-up-form-inputs-first-name");
let firstNameError = document.getElementById("sign-up-form-inputs-first-name-validation");
let lastNameInput = document.getElementById("sign-up-form-inputs-last-name");
let lastNameError = document.getElementById("sign-up-form-inputs-last-name-validation");
let patronymicInput = document.getElementById("sign-up-form-inputs-patronymic");
let patronymicError = document.getElementById("sign-up-form-inputs-patronymic-validation");
let passwordInput = document.getElementById("sign-up-form-inputs-password");
let passwordConfirmationInput = document.getElementById("sign-up-form-inputs-password-confirmation");
let passwordError = document.getElementById("sign-up-form-inputs-password-validation");
let suggestPasswordButton = document.getElementById("sign-up-form-inputs-password-suggest-password-button");
let showPasswordButton = document.getElementById("sign-up-form-inputs-password-show-password-button");
let newNicknameButton = document.getElementById("sign-up-form-inputs-nickname-new-nickname-button");
let nicknameInput = document.getElementById("sign-up-form-inputs-nickname");
let nicknameError = document.getElementById("sign-up-form-inputs-nickname-validation");
let closeSignUpFormButton = document.getElementById("sign-up-form-close-button");
let signInButton = document.getElementById("header-toplinks-sign-in-button");
let tosCheckbox = document.getElementById("sign-up-form-inputs-tos-checkbox");
let tosError = document.getElementById("sign-up-form-inputs-tos-validation");
let signInLoginInput = document.getElementById("sign-in-form-email-nickname-input");
let signInLoginError = document.getElementById("sign-in-form-login-validation");
let signInPasswordInput = document.getElementById("sign-in-form-password-input");
let signInPasswordError = document.getElementById("sign-in-form-password-validation");
let signInFormError = document.getElementById("sign-in-form-validation");
let closeSignInButton = document.getElementById("sign-in-form-close-button");
let signUpRedirectButton = document.getElementById("sign-in-form-sign-up-button");

let suggestedNicknames = 0;
let date = new Date();

async function loadUsers() {
	fetch("./data/user.json")
		.then(response => response.json())
		.then(json => {
			users = json.users.map(raw => User.from(raw));
		})
		.catch(error => {
			console.error("Unable to load users", error);
		});
}

async function loadPasswords() {
	fetch("./data/compromised.txt")
		.then(response => response.text())
		.then(text => {
			compromisedPasswords = text.split("\r\n");
		})
		.catch(error => {
			console.error("Unable to load passwords", error);
		});
}

addEventListener("load", () => {
	loadUsers();
	loadPasswords();
});

function handleSignUpForm() {
	if (signUpForm.checkValidity()) {
		let phone = phoneCountry.value.substr(1) + phoneOperator.value + phoneInput.value;
		users.push(new User(
			phone,
			emailInput.value,
			dobInput.value,
			passwordInput.value,
			firstNameInput.value,
			lastNameInput.value,
			patronymicInput.value || "",
			nicknameInput.value
		));
		closeSignUpForm();
	}
}

function handleSignInForm() {
	if (signInForm.checkValidity()) {
		let login = signInLoginInput.value;
		let password = signInPasswordInput.value;
		let user = users.find(usr => (usr.email === login || usr.username === login) && usr.password === password);
		if (user) {
			authUser = user;
			closeSignInForm();
		} else {
			signInFormError.textContent = "Invalid username or password";
		}
	}
}

function addInputEventListener(input, error, errorFun) {
	input.addEventListener("input", () => {
		if (input.validity.valid) {
			error.textContent = "";
		} else {
			errorFun();
		}
	});
}

addInputEventListener(phoneInput, phoneError, phoneErrorFun);
addInputEventListener(emailInput, emailError, emailErrorFun);
addInputEventListener(dobInput, dobError, dobErrorFun);
addInputEventListener(firstNameInput, firstNameError, firstNameErrorFun);
addInputEventListener(lastNameInput, lastNameError, lastNameErrorFun);
addInputEventListener(patronymicInput, patronymicError, patronymicErrorFun);
addInputEventListener(tosCheckbox, tosError, tosErrorFun);
addInputEventListener(signInLoginInput, signInLoginError, signInLoginErrorFun);
addInputEventListener(signInPasswordInput, signInPasswordError, signInPasswordErrorFun);

signInForm.addEventListener("input", () => {
	signInFormError.textContent = "";
});

passwordInput.addEventListener("input", () => {
	passwordInput.setCustomValidity("");
	passwordConfirmationInput.value = "";
	if (passwordInput.validity.valid) {
		passwordError.textContent = "";
		if (compromisedPasswords.includes(passwordInput.value)) {
			passwordInput.setCustomValidity("Password is compromised");
			passwordErrorFun();
		}
	} else {
		passwordErrorFun();
	}
});

passwordConfirmationInput.addEventListener("input", () => {
	if (passwordInput.value !== passwordConfirmationInput.value) {
		passwordConfirmationInput.setCustomValidity("Passwords should match");
		passwordError.textContent = "Passwords should match";
	} else {
		passwordConfirmationInput.setCustomValidity("");
		passwordError.textContent = "";
	}
});
passwordConfirmationInput.addEventListener("paste", (event) => {
	event.preventDefault();
});

suggestPasswordButton.addEventListener("click", () => {
	let password;
	do {
		password = generatePassword();
	} while (!password.match(PASSWORD_REGEX));

	passwordInput.value = password;
	passwordConfirmationInput.value = password;
	passwordError.textContent = "";
	passwordInput.setCustomValidity("");
	passwordConfirmationInput.setCustomValidity("");
});

showPasswordButton.addEventListener("click", () => {
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		passwordConfirmationInput.type = "text";
		showPasswordButton.textContent = "Hide";
	} else {
		passwordInput.type = "password";
		passwordConfirmationInput.type = "password";
		showPasswordButton.textContent = "Show";
	}
});

newNicknameButton.addEventListener("click", (event) => {
	suggestedNicknames++;
	if (suggestedNicknames == MIN_NICKNAME_ATTEMPTS) {
		nicknameInput.disabled = false;
	}
	nicknameInput.value = generateNickname();
	nicknameInput.setCustomValidity("");
	nicknameError.textContent = "";
});

nicknameInput.addEventListener("input", () => {
	nicknameInput.setCustomValidity("");
	if (nicknameInput.validity.valid) {
		nicknameError.textContent = "";
		let exist = checkNickname(nicknameInput.value);
		if (exist) {
			nicknameInput.setCustomValidity("This nickname is already taken");
			nicknameErrorFun();
		}
	} else {
		nicknameErrorFun();
	}
});

closeSignUpFormButton.addEventListener("click", () => {
	closeSignUpForm();
});

signInButton.addEventListener("click", () => {
	signInFormContainer.classList.add(SIGN_UP_FORM_VISIBLE_CLASS);
	applyNoScroll();
});

closeSignInButton.addEventListener("click", () => {
	closeSignInForm();
});

signUpRedirectButton.addEventListener("click", () => {
	redirectToSignUp();
});

function closeSignUpForm() {
	signUpForm.reset();
	signUpFormContainer.classList.remove(SIGN_UP_FORM_VISIBLE_CLASS);
	removeNoScroll();
}

function closeSignInForm() {
	signInForm.reset();
	signInFormError.textContent = "";
	signInFormContainer.classList.remove(SIGN_UP_FORM_VISIBLE_CLASS);
	removeNoScroll();
}

function redirectToSignUp() {
	closeSignInForm();
	signUpFormContainer.classList.add(SIGN_UP_FORM_VISIBLE_CLASS);
	applyNoScroll();
}

function applyNoScroll() {
	bodyElement.classList.add(NO_SCROLL_CLASS);
}

function removeNoScroll() {
	bodyElement.classList.remove(NO_SCROLL_CLASS);
}

function checkNickname(nickname) {
	return users.map(user => user.username).includes(nickname);
}

function generateNickname() {
	let fName = firstNameInput.value;
	let lName = lastNameInput.value;

	let firstPart = [];
	let secondPart = [];

	if (fName.match(ENGLISH_REGEX) && lName.match(ENGLISH_REGEX)) {
		firstPart = [ fName, fName[0], fName.substr(0, 2), fName.substr(0, 3) ];
		secondPart = [ lName, lName[0], lName.substr(0, 2), lName.substr(0, 3) ];
	} else {
		firstPart = RANDOM_WORDS_FIRST;
		secondPart = RANDOM_WORDS_SECOND;
	}

	let nickname = firstPart[getRandomInt(0, firstPart.length)] +
		NICKNAME_SEPARATOR +
		secondPart[getRandomInt(0, secondPart.length)];
	if (checkNickname(nickname)) {
		nickname = nickname + getRandomInt(users.length, users.length * 2);
	}

	return nickname;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generatePassword() {
	let length = getRandomInt(passwordInput.minLength, passwordInput.maxLength);
	let allCharsLength = PASSWORD_CHARS_POOL.length;
	let password = "";

	for (let i = 0; i < length; i++) {
    	const randomIndex = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * allCharsLength);
    	password += PASSWORD_CHARS_POOL.charAt(randomIndex);
  	}

	return password;
}

dobInput.max = `${date.getFullYear() - MIN_USER_AGE}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate())}`;

function addLeadingZero(num) {
	return num < 10
		? `0${num}`
		: num;
}

function phoneErrorFun() {
	if (phoneInput.validity.valueMissing) {
		phoneError.textContent = "Phone number is required";
	} else if (phoneInput.validity.patternMismatch) {
		phoneError.textContent = "Entered value should be numeric";
	} else if (phoneInput.validity.tooShort) {
		phoneError.textContent = `Phone number should be exactly ${phoneInput.minLength} characters long; you entered ${phoneInput.value.length}`;
	}
}

function emailErrorFun() {
	if (emailInput.validity.valueMissing) {
		emailError.textContent = "Email is required";
	} else if (emailInput.validity.patternMismatch) {
		emailError.textContent = "Entered value should be a valid email address";
	}
}

function dobErrorFun() {
	if (dobInput.validity.valueMissing) {
		dobError.textContent = "Date of Birth is required";
	} else if (dobInput.validity.rangeOverflow) {
		dobError.textContent = `User must be at the age of ${MIN_USER_AGE} or older`;
	}
}

function firstNameErrorFun() {
	if (firstNameInput.validity.valueMissing) {
		firstNameError.textContent = "First Name is required";
	} else if (firstNameInput.validity.tooShort) {
		firstNameError.textContent = `First Name should be at least ${firstNameInput.minLength} characters`;
	} else if (firstNameInput.validity.patternMismatch) {
		firstNameError.textContent = "First Name should be a valid name starting with capital letter";
	}
}

function lastNameErrorFun() {
	if (lastNameInput.validity.valueMissing) {
		lastNameError.textContent = "Last Name is required";
	} else if (lastNameInput.validity.tooShort) {
		lastNameError.textContent = `Last Name should be at least ${lastNameInput.minLength} characters`;
	} else if (lastNameInput.validity.patternMismatch) {
		lastNameError.textContent = "Last Name should be a valid surname starting with capital letter";
	}
}

function patronymicErrorFun() {
	if (patronymicInput.validity.tooShort) {
		patronymicError.textContent = `Patronymic should be at least ${patronymicInput.minLength} characters`;
	} else if (patronymicInput.validity.patternMismatch) {
		patronymicError.textContent = "Patronymic shoulf be a valid father's name starting with capital letter";
	}
}

function passwordErrorFun() {
	if (passwordInput.validity.valueMissing) {
		passwordError.textContent = "Password is required";
	} else if (passwordInput.validity.tooShort) {
		passwordError.textContent = `Password should be at least ${passwordInput.minLength} characters long`;
	} else if (passwordInput.validity.tooLong) {
		passwordError.textContent = `Password should be at most ${passwordInput.maxLength} characters long`;
	} if (passwordInput.validity.patternMismatch) {
		passwordError.textContent = "Password should contain at least one upper case letter, one lower case letter, special symbol and a digit";
	} else if (passwordInput.validity.customError) {
		passwordError.textContent = passwordInput.validationMessage;
	}
}

function nicknameErrorFun() {
	if (nicknameInput.validity.valueMissing) {
		nicknameError.textContent = "Nickname is required";
	} else if (nicknameInput.validity.customError) {
		nicknameError.textContent = nicknameInput.validationMessage;
	} else if (nicknameInput.validity.tooShort) {
		nicknameError.textContent = `Nickname should be at least ${nicknameInput.minLength} characters long`;
	}
}

function tosErrorFun() {
	if (tosCheckbox.validity.valueMissing) {
		tosError.textContent = "You must agree with the Terms of Service to proceed";
	}
}

function signInLoginErrorFun() {
	if (signInLoginInput.validity.valueMissing) {
		signInLoginError.textContent = "Email or Nickname is required";
	}
}

function signInPasswordErrorFun() {
	if (signInPasswordInput.validity.valueMissing) {
		signInPasswordError.textContent = "Password is required";
	}
}