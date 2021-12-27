namespace ProAgil.Domain
{
    public class PalestranteProduto
    {
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
    }    
}