package script;

import java.util.HashMap;
import java.util.Map;

import org.testng.Assert;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class LoginSteps {
    private static final String BASE_URL = "http://localhost:5000";
    private Response response;
    private RequestSpecification request;

    @Given("I set the login API endpoint")
    public void i_set_the_login_api_endpoint() {
        request = RestAssured.given()
                .baseUri(BASE_URL)
                .contentType("application/json");
    }

    @When("I send a POST request with email {string} and password {string}")
    public void i_send_a_post_request_with_email_and_password(String email, String password) {
        Map<String, String> payload = new HashMap<>();
        payload.put("email", email);
        payload.put("password", password);

        response = request
                .body(payload)
                .post("/v1/auth/login");
    }

    @Then("the response status code should be {int}")
    public void the_response_status_code_should_be(int statusCode) {
        Assert.assertEquals(response.getStatusCode(), statusCode, 
            "Expected status code " + statusCode + " but got " + response.getStatusCode());
    }

    @Then("the response should contain a token")
    public void the_response_should_contain_a_token() {
        String token = response.jsonPath().getString("token");
        Assert.assertNotNull(token, "Token not found in response");
        Assert.assertFalse(token.isEmpty(), "Token is empty");
    }
}