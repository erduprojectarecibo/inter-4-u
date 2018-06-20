$(() => {
    $('.ui.modal').modal({
        closable: false,
        autofocus: false
    })

    $('.ui.dropdown').dropdown({
        maxSelections: 2,
        message: {
            maxSelections: 'Maximum of {maxCount} campuses.',
        }
    })

    $('.ui.accordion').accordion()

    // Events
    $('#toggle-modal').click(function () {
        $('.ui.modal').modal('toggle')
    })

    $('#header-button').click(function () {
        let chosenCampus = $("#precinct-select").val()
        switch (chosenCampus.length) {
            case 1:
                checkForCampus(chosenCampus[0])
                break
            case 2:
                checkForCampuses(chosenCampus)
                break
            default:
                $(".campus").each(function () {
                    $(this).closest(".entry").show()
                })
                break
        }
        AccordionEmpty()
    })

    $('#header-clear-button').click(function () {
        $("#precinct-select").dropdown('clear')
        $('#header-button').trigger('click')
    })

    // App 
    $.getJSON("resources/js/programs.json", function (json) {
        for (program in json) {
            let obj = json[program]
            let letter = obj.Grade[0]

            switch (letter) {
                case 'A':
                    appendObj("#associates", obj)
                    break
                case 'B':
                    appendObj("#bachelor", obj)
                    break
                case 'M':
                    appendObj("#master", obj)
                    break
                default:
                    appendObj("#doctorates", obj)
                    break
            }
        }
        AccordionEmpty()
    })

    var offeredInCampus = (program, campus) => $(program).html().includes(campus)

    function checkForCampus(campus) {
        $(".campus").each(function () {
            let program = $(this).closest(".entry")

            if (offeredInCampus(this, campus)) program.show()
            else program.hide()
        })
    }

    function checkForCampuses(campus) {
        $(".campus").each(function () {
            let el = $(this).closest(".entry")
            if (offeredInCampus(this, campus[0]) && offeredInCampus(this, campus[1])) el.show()
            else el.hide()
        })
    }

    function appendObj(target, arr) {
        $(target).append('<div class="entry"><div id="' + arr.Grade + '-' + arr.Cods + '" class="title"><i class="dropdown icon"></i>' + arr.Program + ' - ' + arr.Grade + '</div><div class="content"><p class="paragraph">Program Description:<br/>' + arr.Desc + '</p><br/><br/><p class="method">Education Method: ' + arr.Method.join(', ') + '.</p><p class="credits">Total Credits: ' + arr.Credits + ' credits</p><p class="campus">Campus: ' + arr.Precinct.join(", ") + '.</p></div></div>')
    }

    function AccordionEmpty() {
        $(".ui.accordion").each(function () {
            let isEntryVisible = $(this).children(".entry").is(":visible")
            let msg = $(this).children("#message")

            if (!isEntryVisible) msg.show()
            else msg.hide()
        })
    }
})