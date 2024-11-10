describe('Dashboard Page Test Case', () => {
    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        //cy.viewport(1280, 720)
        cy.baseUrl();
        const email = cy.get('input[name="email"]');
        email.type("user@react.test")

        const password = cy.get("input[name='password']");
        password.type("password")

        const button = cy.get('button');
        button.click();

        cy.url().should('eq', 'https://react-gallery-db1yvbqgp-irfan91catalyze.vercel.app/dashboard')
    })

    it('Found No Post for the First Time', () => {
        cy.contains("Found 0 photos");
    });

    it('Contains Image url and description input, and Publish button', () => {
        //check image
        image.should("be.visible");
        image.should("have.attr", "placeholder", "Image URL");

        //check description
        const description = cy.get('input[name="desc"]');
        image.should("be.visible");
        image.should("have.attr", "type", "text");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "What's on your mind?");

        //check button
        //check button
        const button = cy.get('button');
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it('Upload Some Photos', () => {
        const photos = [
            {
                imageValue: 'https://images.unsplash.com/photo-1657030391597-a02cad4ec92c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                descriptionValue: 'Image 1: Lorem Ipsum'
            },
            {
                imageValue: 'https://images.unsplash.com/photo-1657028310103-f53dd49a856a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                descriptionValue: 'Image 2: Lorem Ipsum'
            }
        ];

        photos.forEach(({ imageValue, descriptionValue }) => {
            const image = cy.get('input[name="image"]');
            image.type(imageValue);

            const description = cy.get('input[name="desc"]');
            description.type(descriptionValue);

            const button = cy.get('.button-primary');
            button.click();

            //check upload image if exist
            cy.get('img').should('have.attr', 'src', imageValue);
            cy.contains(descriptionValue);
        })
        cy.contains(`Found ${photos.length} photos`)
    });
})