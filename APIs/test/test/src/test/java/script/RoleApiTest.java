package script;


import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;        
import static org.hamcrest.Matchers.notNullValue;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;

public class RoleApiTest {

    private static final String TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODk5YzExNWM2MjIxZTAwMWU3N2MxYmYiLCJpYXQiOjE3NTYxMDMxMDcsInR5cGUiOiJyZWZyZXNoIn0.dgVRe7MA6TsfEtyrlIKzb4Dl2-2T8bGwV05QVE0PA7k";

    @Test
    public void testGetRoleApi() {
        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .accept("*/*")
        .when()
            .get("https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/role")
        .then()
            .statusCode(anyOf(equalTo(200), equalTo(304)))
            .header("etag", notNullValue());
    }
}
