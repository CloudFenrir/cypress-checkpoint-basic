describe('Checkpoint tests - Basic/Intermediate', () => {


    it('buttons test - validate all types of clicking methods', () => {
        cy.visit('https://demoqa.com/buttons')
        // double clicking first button
        cy.contains('Double Click Me').dblclick()
        // Validate message is displayed and reads what we are expecting
        cy.get('#doubleClickMessage').should('be.visible').and('contain.text', 'You have done a double click')

        // right clicking second button
        cy.contains('Right Click Me').rightclick()
        // Validate message is displayed and reads what we are expecting
        cy.get('#rightClickMessage').should('be.visible').and('contain.text', 'You have done a right click')

        // clicking second button
        // Looking for the exact text the button has with regex help
        cy.contains(/^Click Me$/).click()
        // Validate message is displayed and reads what we are expecting
        cy.get('#dynamicClickMessage').should('be.visible').and('contain.text', 'You have done a dynamic click')

    })

    it('buttons negative test - Validate only double click message is displayed', () => {
        cy.visit('https://demoqa.com/buttons')
        // double clicking first button
        cy.contains('Double Click Me').dblclick()
        // Validate unique message is displayed and not the other possible ones
        cy.get('#rightClickMessage').should('not.exist')
        cy.get('#dynamicClickMessage').should('not.exist')
        cy.get('#doubleClickMessage').should('be.visible').and('contain.text', 'You have done a double click')
    })


    it('radio buttons test functionality and text', () => {
        cy.visit('https://demoqa.com/radio-button')

        
        // The following lines are retrieving the input fields that are actually enabled. This will get 2 radio buttons.
        cy.contains('Do you like the site?').parent('div').find('input[class="custom-control-input"]').each(($input) => {
            cy.wrap($input)
            .should('not.be.checked')
            // validating the readio is enabled
            .should('be.enabled')
            .check({force: true})
            // Validating the radio was checked
            .should('be.checked')
            // validating the text is displayed when checking radio buttons
            cy.contains('You have selected ').and('contain.text', $input.siblings('.custom-control-label').text()).should('be.visible')

        })
    })


    it('Check box - validate Home folder is checked when all 3 subfolders are selected', () => {
        cy.visit('https://demoqa.com/checkbox')

        // Clicking toggle to see rest of folders
        cy.get('[title="Toggle"]').eq(0).click()
        // Getting all 3 folders and validating when 3 are checked, Home folder is also checked
        cy.get('.check-box-tree-wrapper').find('ol').find('[type="checkbox"]').then((checkBoxes) => {
            cy.wrap(checkBoxes).eq(0).should("not.be.checked");
            cy.wrap(checkBoxes).eq(1).check({ force: true });
            cy.wrap(checkBoxes).eq(2).check({ force: true });
            cy.wrap(checkBoxes).eq(3).check({ force: true });
            cy.wrap(checkBoxes).eq(0).should("be.checked");
          });
    })


    it('Check box - validate Desktop files are selected', () => {
        cy.visit('https://demoqa.com/checkbox')

        // Clicking toggles to get Desktop files
        cy.get('[title="Toggle"]').eq(0).click()
        cy.get('[title="Toggle"]').eq(1).click()
        // Validating checkboxes status are changed when being checked
        cy.contains('Desktop').parent('span').parent('li').find('ol').find('[type="checkbox"]').then((checkBoxes) => {
            cy.wrap(checkBoxes).eq(0).should("not.be.checked");
            cy.wrap(checkBoxes).eq(0).check({ force: true });
            cy.wrap(checkBoxes).eq(0).should("be.checked");
            cy.wrap(checkBoxes).eq(1).should("not.be.checked");
            cy.wrap(checkBoxes).eq(1).check({ force: true });
            cy.wrap(checkBoxes).eq(1).should("be.checked");
            // Validating text label is the correct one after checking Desktop files
            cy.get('#result').find('.text-success').then((selections) => {
                cy.wrap(selections).should('contain.text', 'desktopnotescommands')
            })
          });
    })

    it('Text box validate Desktop files are selected', () => {
        cy.visit('https://demoqa.com/text-box')
        // Filling the page text boxes
        cy.get('#userName').type('Test name')
        cy.get('#userEmail').type('Test@mail.com')
        cy.get('#currentAddress').type('Current address test')
        cy.get('#permanentAddress').type('Permanent address test')
        // Clicking submit button
        cy.get('#submit').click()

        // Validating filled information was displayed on the text box
        cy.get('#name').should('contain.text', 'Name:Test name')
        cy.get('#email').should('contain.text', 'Email:Test@mail.com')
        cy.get('p[id=currentAddress]').should('contain.text', 'Current Address :Current address test')
        cy.get('p[id=permanentAddress]').should('contain.text', 'Permananet Address :Permanent address test')

    })


    it('Links validate links contain url', () => {
        cy.visit('https://demoqa.com/links')

        // Validating the links should contain a specific URL and it is clickable
        cy.get('#simpleLink').should("have.attr", "href", "https://demoqa.com").click()
        cy.get('#dynamicLink').should("have.attr", "href", "https://demoqa.com").click()

    })

    it('Select menu - scenario 1 verify labels', () => {
        cy.visit('https://demoqa.com/select-menu')
        // Clicking the information required and validating it is correctly displayed
        cy.get('#withOptGroup').click()
        cy.contains('Group 1, option 2').click()
        cy.get('#withOptGroup').should('contain.text','Group 1, option 2')

        cy.get('#selectOne').click()
        cy.contains('Mrs.').click()
        cy.get('#selectOne').should('contain.text', 'Mrs.')

        cy.get('#oldSelectMenu').select('Yellow')
        cy.get('#oldSelectMenu').should('contain.text', 'Yellow')

        cy.contains('Multiselect drop down').parent('p').parent('div').find('div').contains('Select...').click()
        cy.get('#react-select-4-option-2').click()
        cy.contains('Multiselect drop down').click()
        cy.contains('Multiselect drop down').parent('p').parent('div').find('div').contains('Black').should('contain.text', 'Black')

        cy.get('#cars').select('Saab')
    })

    it('Select menu - scenario 2 verify labels', () => {
        cy.visit('https://demoqa.com/select-menu')

        cy.get('#withOptGroup').click()
        cy.contains('A root option').click()
        cy.get('#withOptGroup').should('contain.text','A root option')

        cy.get('#selectOne').click()
        cy.contains('Other').click()
        cy.get('#selectOne').should('contain.text', 'Other')

        cy.get('#oldSelectMenu').select('Blue')
        cy.get('#oldSelectMenu').should('contain.text', 'Blue')

        cy.contains('Multiselect drop down').parent('p').parent('div').find('div').contains('Select...').click()
        cy.get('#react-select-4-option-2').click()
        cy.get('#react-select-4-option-1').click()
        cy.get('#react-select-4-option-0').click()
        cy.contains('Multiselect drop down').click()
        cy.contains('Multiselect drop down').parent('p').parent('div').find('div[class=" css-1hwfws3"]').contains('Black').should("have.text", "Black")
        cy.contains('Multiselect drop down').parent('p').parent('div').find('div[class=" css-1hwfws3"]').contains('Blue').should("have.text", "Blue")
        cy.contains('Multiselect drop down').parent('p').parent('div').find('div[class=" css-1hwfws3"]').contains('Green').should("have.text", "Green")

        cy.get('#cars').select('Audi')
    })

    it('Tabs and open testing', () => {
        cy.visit('https://demoqa.com/selectable')


        // Validate selections when active and when not for every element
        cy.get('#verticalListContainer').find('li').then( (listOfElements) => {
            cy.wrap(listOfElements).eq(0).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(0).click()
            cy.wrap(listOfElements).eq(0).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(1).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(1).click()
            cy.wrap(listOfElements).eq(1).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(2).click()
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(3).click()
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("contain", 'active');
        })
    })


    it('Tabs and open testing second scenario', () => {
        cy.visit('https://demoqa.com/selectable')

        // Navigating to Grid tab
        cy.contains('Grid').click()
        // Validate selections when active and when not for every element
        cy.get('#gridContainer').find('li').then( (listOfElements) => {
            cy.wrap(listOfElements).eq(0).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(0).click()
            cy.wrap(listOfElements).eq(0).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(1).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(4).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(1).click()
            cy.wrap(listOfElements).eq(1).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(4).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(2).click()
            cy.wrap(listOfElements).eq(2).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(4).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(3).click()
            cy.wrap(listOfElements).eq(3).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(4).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(4).click()
            cy.wrap(listOfElements).eq(4).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(5).click()
            cy.wrap(listOfElements).eq(5).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(6).click()
            cy.wrap(listOfElements).eq(6).invoke("prop", "class").should("contain", 'active');            
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("not.contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(7).click()
            cy.wrap(listOfElements).eq(7).invoke("prop", "class").should("contain", 'active');
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("not.contain", 'active');

            cy.wrap(listOfElements).eq(8).click()
            cy.wrap(listOfElements).eq(8).invoke("prop", "class").should("contain", 'active');
        })
    })




})