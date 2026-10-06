package example;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.*;
@RestController
public class RecordsController {
    private final RecordRepository repository;
    public RecordsController(RecordRepository repository) { this.repository = repository; }
    @GetMapping("/health") public Map<String, String> health() { return Map.of("status", "ok"); }
    @GetMapping("/api/{kind}") public List<Entry> list(@PathVariable String kind) { return repository.list(kind); }
    @GetMapping("/api/{kind}/{id}") public Entry get(@PathVariable String kind, @PathVariable String id) {
        return repository.list(kind).stream().filter(r -> r.id().equals(id)).findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/api/{kind}/{id}") public Entry save(@PathVariable String kind, @PathVariable String id, @RequestBody Entry entry) {
        repository.list(kind);
        if (!id.equals(entry.id()) || entry.attributes() == null ||
            Arrays.asList(entry.id(), entry.ownerId(), entry.status(), entry.createdAt(), entry.title()).stream().anyMatch(s -> s == null || s.isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return repository.save(kind, entry);
    }
}
