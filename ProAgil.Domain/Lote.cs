using System;

namespace ProAgil.Domain
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int quantidade { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; }
    }
}