namespace ProAgil.Domain
{
    public class RedeSocial
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? ProdutoId { get; set; }
        public Produto Produto { get; }
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; }
    }
}