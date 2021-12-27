using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //GERAL
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;

        Task<bool> SaveChangesAsync();

        //EVENTOS
        Task<Produto[]> GetAllProdutoAsyncByTema(string tema, bool includePalestrantes);
        Task<Produto[]> GetAllProdutoAsync(bool includePalestrantes);
        Task<Produto> GetProdutoAsyncById(int ProdutoId, bool includePalestrantes);

        //PALESTRANTE
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeProdutos);
        Task<Palestrante> GetPalestranteAsync(int PalestranteId, bool includeProdutos);
    }
}