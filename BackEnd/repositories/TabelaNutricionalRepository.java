package repositories;

import Entity.TabelaNutricional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TabelaNutricionalRepository extends JpaRepository<TabelaNutricional, Long> {
}
