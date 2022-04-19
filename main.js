import fetch from 'node-fetch';
import prompt from 'prompt';

//This code works by referencing the NEU Course Browser instead of the Planner.
var term;

var cookie = "JSESSIONID=25FEB269BCCBBC594B26C5907E085E1F; GUEST_LANGUAGE_ID=en_US; ANONYMOUS_USER_ID=1143064344; ajs_user_id=null; ajs_group_id=null; _biz_uid=01d81d8fa3f04221e9ac44deb51c99a0; __utma=36777023.1499429391.1617805029.1620734668.1620736721.9; __utmz=36777023.1620736721.9.9.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); subdomain=GA1.2.1499429391.1617805029; _mkto_trk=id:558-EBH-425&token:_mch-neu.edu-1620736753983-94437; _hjid=1e7cce7e-cbd8-46a0-a573-49215175acdb; nmstat=19fe68d6-41fa-2553-e117-88c26191dc9b; _biz_flagsA=%7B%22Version%22%3A1%2C%22ViewThrough%22%3A%221%22%2C%22XDomain%22%3A%221%22%2C%22Mkto%22%3A%221%22%7D; rollup=GA1.2.1499429391.1617805029; _biz_nA=4; _biz_pendingA=%5B%5D; _sp_id.cb6f=499749a0-d21b-4773-bef7-9afe3e1fddab.1620736754.1.1620736766.1620736754.d44c3867-5b08-4fb4-aff7-9e5dccfcfd68; _ga=GA1.2.1499429391.1617805029; nubanner-cookie=2384404891.36895.0000; _gid=GA1.2.107653109.1635862179; LtpaToken2=PxOVEZlXfdY6nSqsuzTOYi+Zw9nn+pcRaBsLWKO656I2fqTBu+zVcB9XCO9XOzrCwFQc/m6QfJmTbg2hr/tQP9Boh46m5gY8mHzpsYFu78hwx/4Mt482fhqYatzv9cKQ2DmCa2azoDFJa7L5zZhGPh/N5NEzpIqlVVKcpxeTX9h5mQ40xDiv5n+jsZtDUqaxIXan1UR4RyTyqY4xsw/3UiOD9vGjD2QTFghBKqi0YnGVTLg1HMs7TYgJZnIDMnZmY9agWKLtYzDwyChEgYuVfFUb8IiVmd6/cm3EVZ0MfpF+wjRNuJoAA3WHHgni2rcsgLvBou5ezmrStmthzmL8zCHp+1ZJSUsTl6+HPeeXqWD5P9iq6zwUz034YtNv9vF3B5Dhm79fo5ksxsMabPNRttEPgKpPX/IqywiXu2qYA51Fc74xa3Jn22X1IzudkCQYcIsxYvhogPlbGKHEqDDSb3Mlalu6fqTRCIjd5fT3A4f7Cz78xZKTcL8kz2kgwu5yG1phSdiQQfBaYIOCL9FpgaCeCEXWrBaUjtJwROMcVQiC3pMWP+VDLa4U+p6Bm8TM/bC507Ne4W+nmNd0j845YLH8SJE4xGdwn9NdqwrLm27pOK7SQyyqaUu2to0S7JT1H4NRKqkt6l5nDc+HuxA9gC0PnsVB61Z9eAOXAuXY0CBy4wiuSvkc2Vre4r32/vFAa0sHqtCteIlRGvvTWTQcY0MULuBiX/cZtSc7Jd6phtwJ7Kbvu9tSQxuwdlwG3mhLIn6BPYCkaXjMVKmVrrXHqeFp4Jt2LVOdKZJ47Nh+pBk=";
var xsync = "000a063e-f131-4a71-99f6-fae88106b78d";
var scookie = "JSESSIONID=7BC7FB1D1F3E31D3F2E0AB146D422790; _ga=GA1.2.811439139.1629487817; _gid=GA1.2.1755717850.1635822794; nubanner-cookie=2636063131.36895.0000; _gat_Ellucian=1";

console.log("hello");
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

    fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/saveTerm?mode=search&term=" + t + "&uniqueSessionId=eed8v1635862179249", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "x-synchronizer-token": "ec295b68-67de-4b09-8711-d3f6d099c7d8",
            "cookie": cookie,
            "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=search",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(async function (res) {
        //console.log(res);

        var tex = await fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/search?mode=search", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-synchronizer-token": "ec295b68-67de-4b09-8711-d3f6d099c7d8",
                "cookie": cookie,
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=search",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "term=" + t + "&studyPath=&studyPathText=&startDatepicker=&endDatepicker=&uniqueSessionId=eed8v1635862179249",
            "method": "POST"
        });
        return tex;

    }).then(res => res.text()).then(async function (res) {
        //console.log(res);
        var tex = await fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/selfServiceMenu/data", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": cookie,
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        return tex;

    }).then(res => res.text()).then(async function (res) {
        //console.log(res);
        var tex = await fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/menu?type=Personal", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": cookie,
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
        return tex;

    }).then(res => res.text()).then(function (res) {
        //console.log(res);
        //RETURNS IF COURSE AVAILABLE
        fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/get_subjectcoursecombo?searchTerm=" + c + "&term=" + t + "&offset=1&max=10&uniqueSessionId=eed8v1635862179249&_=1635864694706", {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-synchronizer-token": "36034ff4-210b-45ec-8b1f-3e69df3df3a7",
                "cookie": cookie,
                "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then(res => res.text()).then(res => {
            console.log(res);
            if (res.indexOf(c.toUpperCase()) > 0)
                console.log("Class Offered in Term");
            else
                console.log("Class Not Offered in Term");
        }).then(async function (res) {
            var tex = await fetch("https://nubanner.neu.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_subjectcoursecombo=" + c + "&txt_term=" + t + "&startDatepicker=&endDatepicker=&uniqueSessionId=5bjcs1635880059985&pageOffset=0&pageMaxSize=10&sortColumn=subjectDescription&sortDirection=asc", {
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
                    "cookie": scookie,
                    "Referer": "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": null,
                "method": "GET"
            })
            return tex;
        }
        ).then(res => res.text()).then(res => {
            //console.log(res);
            console.log(res.substring(res.indexOf("{"), res.lastIndexOf("{")));
            if (res.indexOf("Hon") > 0 || res.indexOf("HON") > 0)
                console.log("Class offered in Honors");
        })
    });
};

