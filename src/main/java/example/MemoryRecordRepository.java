package example;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Path;
import java.util.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
@Repository
public class MemoryRecordRepository implements RecordRepository {
    private final Map<String, List<Entry>> rows = new HashMap<>();
    public MemoryRecordRepository(ObjectMapper mapper) throws Exception {
        for (String kind : List.of("catalog", "content")) {
            rows.put(kind, new ArrayList<>(Arrays.asList(mapper.readValue(Path.of("fixtures", kind + ".json").toFile(), Entry[].class))));
        }
    }
    public synchronized List<Entry> list(String kind) {
        if (!rows.containsKey(kind)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return List.copyOf(rows.get(kind));
    }
    public synchronized Entry save(String kind, Entry entry) {
        list(kind);
        rows.get(kind).removeIf(row -> row.id().equals(entry.id()));
        rows.get(kind).add(entry);
        return entry;
    }
}
