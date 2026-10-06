package example;
import java.util.List;
public interface RecordRepository {
    List<Entry> list(String kind);
    Entry save(String kind, Entry entry);
}
