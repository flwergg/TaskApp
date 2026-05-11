// Prueba E2E del flujo principal de TaskApp

describe("TaskApp - Flujo principal", () => {
  it("el usuario se loguea, crea una tarea y la ve en la lista", () => {
    cy.visit("http://localhost:3000");

    // Login
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("1234");
    cy.contains("button", "Ingresar").click();

    // Crear tarea
    cy.get("#taskTitle").type("Tarea E2E de prueba");
    cy.contains("button", "Crear").click();

    // Verificar que la tarea aparece en el listado
    cy.contains("#taskList", "Tarea E2E de prueba");
  });
});
