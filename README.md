# Moovilog

# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível cadastrar uma empresa;
- [x] Deve ser possível cadastrar membros para uma empresa;
- [x] Deve ser possível cadastrar motoristas;
- [x] Deve ser possível se autenticar como motorista;
- [ ] Deve ser possível obter informações de um frete como motorista;
- [x] Deve ser possível cadastrar dados bancários de um motorista;
- [x] Deve ser possível adicionar motoristas a uma empresa;
- [x] Deve ser possível cadastrar veículos;
- [ ] Deve ser possível cadastrar região de atendimento de uma empresa;
- [ ] Deve ser possível cadastrar as cidades atendidas de uma empresa;
- [x] Deve ser possível cadastrar um frete;
- [ ] Deve ser possível obter informações de um frete específico;
- [x] Deve ser possível obter todos os fretes de uma empresa;

# RNs (Regras de negócio)

- [x] Não deve ser possível cadastrar usuário com e-mail duplicado;
- [x] Não deve ser possível cadastrar uma empresa com um CNPJ duplicado;
- [x] Não deve ser possível cadastrar membros com e-mail duplicado;
- [x] Não deve ser possível cadastrar empresas com roles diferente de ADMIN;
- [x] Não deve ser possível cadastrar motoristas e veículos com roles diferente de ADMIN ou OPERATIONAL;
- [x] Não deve ser possível cadastrar dados bancários de um motorista com roles diferente de ADMIN ou FINANCIAL;
- [x] Não deve ser possível cadastrar veículos com a mesma placa;
- [x] Não deve ser possível cadastrar fretes com roles diferente de ADMIN ou OPERACIONAL;

# RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
