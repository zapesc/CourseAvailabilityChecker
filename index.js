import fetch from 'node-fetch';
import prompt from 'prompt';

//Does not work due to missing requests for the planner webpage
var term;

var cookie = "JSESSIONID=C39C6BAC88AAA25094B56B6586C8785C; _ga=GA1.2.811439139.1629487817; nubanner-cookie=2636063131.36895.0000; _gid=GA1.2.1239319053.1635459747; _gat_Ellucian=1";
var xsync = "3e80c071-b23c-4694-85e6-0db0c386dab8";

prompt.start();
prompt.get(['c', 't'], function (err, result) {
    if (err) { return onErr(err); }
    if (result.t == "s")
        term = 202230;
    else if (result.t == "f")
        term = 202210;
    else if (result.t == "s1")
        term = 202140;
    else if (result.t == "s2")
        term = 202160;
    lookup(result.c, term);
});
function onErr(err) {
    console.log(err);
    return 1;
}

function lookup(c, t) {

    //Clear Search Terms before beginning search
    fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/courseSearch/resetDataForm", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "x-synchronizer-token": xsync,
            "cookie": "JSESSIONID=C39C6BAC88AAA25094B56B6586C8785C; _ga=GA1.2.811439139.1629487817; nubanner-cookie=2636063131.36895.0000; _gid=GA1.2.1239319053.1635459747",
            "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/plan/plan",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "resetCourses=true&resetSections=true",
        "method": "POST"
    }).then(res =>
        res.text()
    ).then(async function (res) {
        console.log(res);
        var tex;
        if (res.indexOf("true") > 0) {
            console.log("1111111111111111");
        };
        //CHANGE TERM FOR CLASS
        tex = await fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/saveTerm?mode=plan&term=" + term + "&uniqueSessionId=op13v1635571692057", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-synchronizer-token": xsync,
                "cookie": "JSESSIONID=D0FDFC5529E0C489085F0662E077D6B7; _ga=GA1.2.811439139.1629487817; nubanner-cookie=2636063131.36895.0000; _gid=GA1.2.1239319053.1635459747",
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=plan",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        return tex.text();
    }).then(function (res) {
        console.log(res);
        //GET CLASS OFFERING STATUS
        fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/courseSearchResults/courseSearchResults?txt_subjectcoursecombo=" + c + "&txt_term=" + t + "&startDatepicker=&endDatepicker=&uniqueSessionId=ir9431635538728087&pageOffset=0&pageMaxSize=10&sortColumn=subjectDescription&sortDirection=asc", {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-synchronizer-token": xsync,
                "cookie": cookie,
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/plan/plan",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then(res => res.text()).then(res => {
            console.log(res);
            if (res.indexOf('"anySections": true') > 0)
                console.log("Class Offered in Term");
            else
                console.log("Class Not Offered in Term");
        })
    });

};

