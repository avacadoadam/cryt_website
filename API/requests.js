function getFreelancer() {
    $.get("https://cryt.ie/service/freelancer/search",
        response => {
            let data = [];
            for (var i = response.length - 1; i >= 0; i--) {
                data[i] = [
                    response[i].projectOwnerName,
                    response[i].projectBudget_highest,
                    response[i].projectCategory[0],
                    response[i].projectName,
                    response[i].projecOwnerlocationCountry
                ]
            }
            $('#data_table').DataTable({
                data: data,
                columns: [
                    {title: "Username"},
                    {title: "budget"},
                    {title: "Category"},
                    {title: "Project Name"},
                    {title: "Country"}
                ]
            });
            $(".loader").hide();
            $("#DataName").text("freelancer data");

        })
        .fail(() => errorAccessingDataBase())
}

function getCompany() {
    $.get(
        "https://cryt.ie/service/glassdoor/search",
        response => {
            let data = [];
            for (var i = response.length - 1; i >= 0; i--) {
                data[i] = [
                    response[i].name,
                    response[i].HQ,
                    response[i].ceo_name,
                    response[i].emp_size,
                    response[i].founded,
                    response[i].industry,
                    response[i].industry_id,
                    response[i].location,
                    response[i].revenue,
                    response[i].website,
                ]
            }

            let columns = [
                {title: "name"},
                {title: "HQ"},
                {title: "ceo_name"},
                {title: "emp_size"},
                {title: "founded"},
                {title: "industry"},
                {title: "industry_id"},
                {title: "location"},
                {title: "revenue"},
                {title: "website"},
            ];
            $('#data_table').DataTable({
                data: data,
                columns: columns
            })
            $(".loader").hide();
            $("#DataName").text("Glassdoor data");
        })
        .fail(() => errorAccessingDataBase())
}

function getJobs() {
    $.get(
        "https://cryt.ie/service/jobs/search",
        (response) => {
            let data = [];
            for (var i = response.length - 1; i >= 0; i--) {
                data[i] = [
                    response[i].job_title,
                    response[i].location,
                    response[i].salary,
                    response[i].sector[0],
                    // response[i].questions[0]
                ]
            }
            let columns = [
                {title: "job_title"},
                {title: "location"},
                {title: "salary"},
                {title: "sector"},
                {title: "question"}
            ];
            $('#data_table').DataTable({
                data: data,
                columns: columns
            });
            $(".loader").hide();
            $("#DataName").text("jobs.ie     data");
        }
    ).fail(() => errorAccessingDataBase());
}

function errorAccessingDataBase() {
    $("#unsuccessful_modal").text("There was a error processing this request");
    $("#unsuccessful_modal").show().delay(2500).fadeOut();
}


$(document).ready(function () {
    // $('#myTable').DataTable();
});

function dataSource(type) {
    //transition
    $('#Choose_type').fadeOut();
    $('#Show_Data').fadeIn();
    if (type === "freelancer") {
        getFreelancer()
    } else if (type === "jobs") {
        getJobs()
    } else if (type === "glassdoor") {
        getCompany()
    }
}

function chooseSource() {
    $('#Choose_type').fadeIn();
    $('#Show_Data').fadeOut();
}

try{
    $('#price_contact').click(() => {
            let email = $('#contact_us[name="email"]').val();
            let message = $('#contact_us[name="message"]').val();
            $.post("/service/contact_us",
                {
                    "email": email,
                    "message": message
                }
                , (data, status) => {
                    if (data.error) {
                        $("#success_modal").text("You have successful subscribed");
                        $("#success_modal").show().delay(2500).fadeOut();
                    } else {
                        $("#unsuccessful_modal").text("unsuccessful subscribed please enter valid email");
                        $("#unsuccessful_modal").show().delay(2500).fadeOut();
                    }
                }).fail((xhr,status,error) => {
                $("#unsuccessful_modal").text("There was a error processing this request");
                $("#unsuccessful_modal").show().delay(2500).fadeOut();
            })
        }
    )

}catch (e) {
    $("#unsuccessful_modal").text("There was a error processing this request");
    $("#unsuccessful_modal").show().delay(2500).fadeOut();
    console.log(e)
}
