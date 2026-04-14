import "./Pagination.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        className="btn-secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        aria-label="Page précédente"
      >
        ← Précédent
      </button>

      <div className="pagination-pages">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pagination-btn ${i === page ? "active" : ""}`}
            onClick={() => onPageChange(i)}
            aria-label={`Page ${i + 1}`}
            aria-current={i === page ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        className="btn-secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        aria-label="Page suivante"
      >
        Suivant →
      </button>
    </div>
  );
}