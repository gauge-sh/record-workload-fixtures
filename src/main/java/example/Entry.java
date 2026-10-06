package example;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import java.util.Map;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Entry(String id, String ownerId, String status, String createdAt, String title,
    Map<String, Object> attributes, String category, List<Variant> variants,
    Integer schemaVersion, List<Block> blocks) {
    public record Variant(String sku, Map<String, Object> attributes, int stock) {}
    public record Block(String id, String type, Map<String, Object> data) {}
}
