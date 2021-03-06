package com.Parcial2Cortez.app.Common;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public abstract class CommonService<E extends CommonEntity, R extends JpaRepository<E, Long>> implements CommonIService<E> {
	
	@Autowired //injeccion de dependencia
	protected R repository;	
	

	@Override
	public E findById(long id) throws Exception {
		try {
			// se usa para atrapar un null
			Optional<E> varOptional = repository.findById(id);
			if(varOptional.isPresent())
				return varOptional.get();
			else
				return null;

		} catch (Exception e) {

			throw new Exception(e.getMessage());
		}
		
	}

	@Override
	public E save(E entityForm) throws Exception {
		try {
			entityForm = repository.save(entityForm);
			return entityForm;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public E update(long id, E entity) throws Exception {
		try {
			if (repository.existsById(id) == false) {
				throw new Exception("No value present");
			}
			entity.setId(id);
			entity = repository.save(entity);
			return entity;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public int countPages(int size) throws Exception {
		try {
			Pageable pageable = PageRequest.of(0, size);
			return repository.findAll(pageable).getTotalPages();			

		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public List<E> findAll(int page, int size) throws Exception {
		
		try {
			Pageable pageable = PageRequest.of(page, size);
			return repository.findAll(pageable).getContent();			

		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		
	}
	
	public boolean delete(long id) throws Exception{
		try {
			if(repository.existsById(id)) {
				repository.deleteById(id);
			}		
			
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		
		return !repository.existsById(id);
	}


}
