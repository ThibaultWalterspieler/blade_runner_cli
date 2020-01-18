    this.browser = window.navigator.appVersion;
    console.log('hello');

    setTimeout(function () {
        document.getElementById('wrapper-id').classList.remove('hide');
        document.getElementById('transition').classList.add('transition-dp');
        // document.querySelector('wrapper').style.transform = ""
        anime({
            targets: '.wrapper',
            easing: 'linear',
            height: ['0vh', '100vh'],
            duration: 4800
        });
    }, 3990);

    const consoleWrapper = document.querySelector('#command');
    const commandLine = [];

    const cli = document.createElement('div');


    function addLine() {
        for (let index = 0; index < commandLine.length; index++) {
            consoleWrapper.append(commandLine[index]);
        }
    }

    setTimeout(() => {
        addLine();
    }, 300);



    // Get current date | time
    const timeWrapper = document.querySelector('.hours');
    const dateWrapper = document.querySelector('.day');
    const optionMedDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    setInterval(() => {
        const date = new Date();
        const formatedDate = date.toLocaleDateString("en-us", optionMedDate);
        const formatedTime = date.toLocaleTimeString('en-US');
        dateWrapper.innerHTML = formatedDate;
        timeWrapper.innerHTML = formatedTime;
    }, 1);

    const replicantsArray = [{
            nexus_rep_sn: 'N6MAA10816',
            nexus_first_name: 'Roy',
            nexus_last_name: 'Batty',
            physical_class: 'physical-A',
            mental_class: 'mental-A',
            current_status: 'offline',
            current_location: '37.771580, -122.435528'
        },
        {
            nexus_rep_sn: 'N6FAB21416',
            nexus_first_name: 'Priss',
            nexus_last_name: 'Stratton',
            physical_class: 'physical-A',
            mental_class: 'mental-B',
            current_status: 'offline',
            current_location: '37.771580, -122.435528'
        },
        {
            nexus_rep_sn: 'N6MAC41717',
            nexus_first_name: 'Leon',
            nexus_last_name: 'Kowalski',
            physical_class: 'physical-A',
            mental_class: 'mental-C',
            current_status: 'offline',
            current_location: '37.771580, -122.435528'
        },
        {
            nexus_rep_sn: '*brokedData',
            nexus_first_name: '*brokedData',
            nexus_last_name: 'Hodge',
            physical_class: '*brokedData',
            mental_class: '*brokedData',
            current_status: 'offline',
            current_location: 'position unknown'
        },

    ]

    setInterval(() => {
        replicantsArray.forEach(replicantsData => {
            replicantsData.current_location++;
        });
    }, 1);



    // Generate head
    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    // Generate row
    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }

    let table = document.querySelector(".replicant-table");
    let data = Object.keys(replicantsArray[0]);
    generateTableHead(table, data);
    generateTable(table, replicantsArray);